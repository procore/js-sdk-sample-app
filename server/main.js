require('isomorphic-fetch')
const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const Auth = require('hapi-auth-cookie')
const Joi = require('joi')
const { v4 } = require('uuid')
const { token, refresh, authorize, oauth, client } = require('@procore/sdk')

const CLIENT_ID =process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const server = new Hapi.Server()

server.connection({ port: 8080, host: 'localhost' })

server.register(
  [Inert, Vision, Auth],
  (err) => {
  if (err) { throw err }

  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000  });

  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', true, {
    password: process.env.SESSION_PASSWORD,
    cookie: 'procore-resources',
    isSecure: false,
    redirectTo: '/login',
    ttl: 24 * 60 * 60 * 1000,
    validateFunc: (req, session, callback) => {
      cache.get(session.sid, (err, cached) => {
        if (err) { return callback(err, false) }

        if (!cached) { return callback(null, false) }

        return callback(null, true, cached.code)
      })
    }
  })

  server.views({
    engines: {
      jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'views'
  })

  server.route({
    method: 'GET',
    path: '/sessions/create',
    config: {
      auth: false,
      handler: (req, reply) => {
        return reply.redirect(authorize({ clientId: CLIENT_ID, uri: REDIRECT_URL }))
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/oauth/procore/consume',
    config: {
      auth: false,
      validate: { query: { code: Joi.string() } },
      handler: (req, reply) => {
        const code = req.query.code
        const sid = v4()

        token({ id: CLIENT_ID, secret: CLIENT_SECRET, uri: REDIRECT_URL, code })
          .then(code => {
            req.server.app.cache.set(sid, { code }, 0, err => {
              if (err) { reply(err) }

              req.cookieAuth.set({ sid })

              return reply.redirect('/')
            })
          })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/sessions/refresh',
    config: {
      auth: false,
      handler: (req, reply) => {
        const sid = session.sid

        server.app.cache.get(sid, (err, {account}) => {
          refresh({
            id: CLIENT_ID,
            secret: CLIENT_SECRET,
            uri: REDIRECT_URL,
            refresh: account.refresh_token,
            token: account.auth_token
          })
          .then((refreshed) => {
            return req.app.cache.set(sid, { account: refreshed }, (err) => {
              if (err) {
                return reply(err)
              }

              return reply(refreshed)
            })
          })
        })
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: 'public',
          listing: true
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: {
        view: 'App'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      handler: (req, reply) => {
        reply.view('App', { auth: req.auth.credentials })
      }
    }
  })

  server.start()
})
