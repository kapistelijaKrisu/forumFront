import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/dude'

const LogoutButton = (props) => (
  <button onClick={props.logout} name="logout">logout</button>
)

export default connect(
  null,
  { logout }

)(LogoutButton)