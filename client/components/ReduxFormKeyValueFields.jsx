import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { Field } from 'redux-form'
import ReduxFormTextField from './ReduxFormTextField.jsx'

const ReduxFormKeyValueFields = ({ addLabel, fields }) => {
  return (
    <List>
      <Subheader>
        <FlatButton label={addLabel} onClick={() => fields.push({})} />
      </Subheader>
      {fields.map((member, index, field) => (
        <ListItem key={member} disabled>
          <Field name={`${member}.key`} hintText="Key" component={ReduxFormTextField} />
          <Field name={`${member}.value`} hintText="Value" component={ReduxFormTextField} />
          <FlatButton label="Remove" onClick={() => fields.remove(index)} />
        </ListItem>
      ))}
    </List>
  )
}

export default ReduxFormKeyValueFields
