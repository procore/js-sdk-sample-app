const React = require('react')

const App = ({ auth }) => (
  <html>
    <head>
      <title>Procore Resources | Explore The API</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
      <meta name="token" content={auth.access_token} />
      <meta name="refresh" content={auth.refresh_token} />
    </head>
    <body>
      <div id="app"></div>
      <script type="text/javascript" src="/public/bundle.js" />
    </body>
  </html>
)

App.defaultProps = {
  auth: {}
}

module.exports = App
