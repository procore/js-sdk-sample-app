import React from 'react'

class Resource extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default Resource
