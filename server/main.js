const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const { authenticate, client } = require('procore')

const CLIENT_ID =process.env.CLIENT_ID

const server = new Hapi.Server()

server.connection({ port: 8080, host: 'localhost' })

server.register([Inert, Vision], () => {
  server.views({
    engines: {
      jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'views'
  })

  server.route({
    method: 'GET',
    path: '/oauth/consume/procore',
    handler: (req, res) => {
    console.log(res)
    }
  })

  server.route({
    method: 'GET',
    path: '/login',
    handler: (req, res) => {
      res.redirect(`https://app.procore.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=https://node-procore.ngrok.io/oauth/consume/procore`)
    }
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      view: 'App'
    }
  })

  server.start()
})
