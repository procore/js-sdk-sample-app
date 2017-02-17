import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { createReducer, createAction } from 'redux-act'

export const setResponse = createAction('set response')


export const reducer = createReducer(
  { [setResponse]: (state, action) => state },
  {  }
)


export const store = createStore(combineReducers({
  app: reducer,
  form: formReducer
}))
