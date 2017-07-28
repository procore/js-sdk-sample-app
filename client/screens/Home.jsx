import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Inspector from 'react-inspector'
import { oauth, client, refresher, me } from '@procore/js-sdk'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { Field, reduxForm, FieldArray } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { setResponse } from './../duck'
import ReduxFormDropdownMenu from './../components/ReduxFormDropdownMenu.jsx'
import ReduxFormTextField from './../components/ReduxFormTextField.jsx'
import ReduxFormKeyValueFields from './../components/ReduxFormKeyValueFields.jsx'

const authorizer = oauth(
  document.head.querySelector('[name=token]').getAttribute('content')
)

const refreshToken = token => fetch(
  '/oauth/procore/refresh',
  { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }
);

const procore = client(
  refresher(authorizer, refreshToken),
  { credentials: 'omit' }
)

const hashFromTuples = R.compose(
  R.reduce(
    (memo, {key, value}) => {
      memo[key] = value

      return memo
    },
    {}
  ),
  R.when(R.isNil, () => [])
)


const startResponseChange = ({ endpoint, method, qs }, dispatch) => {
  return procore[method]({ base: `/vapid/${endpoint}`, qs: hashFromTuples(qs), params: {} })
    .then(({ body }) => dispatch(setResponse(body)))
}

const Home = ({ dispatch, app, option, method, endpoint, value, source, handleSubmit }) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup>
          <Field component={ReduxFormTextField} name="endpoint" hintText="Endpoint" fullWidth={true} />
        </ToolbarGroup>
        <ToolbarGroup>
          <Field
            component={ReduxFormDropdownMenu}
            name="method"
            options={[['get', 'Get'], ['post', 'Post'], ['patch', 'Patch'], ['destroy', 'Destroy']]}
          />
          <RaisedButton label="Submit" primary onClick={() => handleSubmit()} />
          <FlatButton label="Logout" primary href='/logout' />
        </ToolbarGroup>
      </Toolbar>
      <FieldArray name="qs" addLabel="Query" component={ReduxFormKeyValueFields} />
      {R.not(R.isNil(app.resource)) && <Inspector data={app.resource} />}
    </div>
  )
}

export default R.compose(
  connect(state => state),
  reduxForm({
    form: 'home',
    onSubmit: startResponseChange,
    initialValues: { method: 'get', endpoint: 'me' },
  })
)(Home)
