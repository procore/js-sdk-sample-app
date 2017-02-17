import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const ReduxFormDropdownMenu = ({ children, field, options, input }) => {
  return (
    <DropDownMenu
      value={input.value}
      onChange={(event, idx, value) => input.onChange(value)}
    >
      {options.map(([value, label]) => <MenuItem key={value} value={value} primaryText={label} />)}
    </DropDownMenu>
  )
}
export default ReduxFormDropdownMenu
