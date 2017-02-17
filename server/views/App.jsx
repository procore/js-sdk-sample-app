const React = require('react')
import { Provider } from 'react-redux'

const App = ({ auth }) => (
  <html>
    <head>
      <title>Node Procore Boilerplate</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
      <meta name="token" content={auth.access_token} />
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
