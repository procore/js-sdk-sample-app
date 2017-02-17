import React from 'react'
import { connect } from 'react-redux'
import { oauth, client } from 'procore'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { Field, reduxForm, FieldArray } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { setResponse } from './../duck'
import ReduxFormDropdownMenu from './../components/ReduxFormDropdownMenu.jsx'
import ReduxFormTextField from './../components/ReduxFormTextField.jsx'
import ReduxFormKeyValueFields from './../components/ReduxFormKeyValueFields.jsx'

const procore = client(
  oauth(
    document.head.querySelector('[name=token]').getAttribute('content')
  )
)

const startResponseChange = ({ endpoint, method }, dispatch) => {
  console.log(endpoint, dispatch, procore)
  return procore[method]({ endpoint })
    .then((response) => dispatch(changeResponse(response)))
}

const Home = ({ dispatch, option, method, endpoint, value, source, handleSubmit }) => {
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
        </ToolbarGroup>
      </Toolbar>
      <FieldArray name="qs" addLabel="Query" component={ReduxFormKeyValueFields} />
    </div>
  )
}

export default reduxForm({
  form: 'home',
  initialValues: { method: 'get'  },
  onSubmit: startResponseChange
})(Home)
