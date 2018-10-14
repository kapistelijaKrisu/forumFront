import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../reducers/dude'
import { notify } from '../../reducers/notification'

const LogoutButton = (props) => (
  <button style={buttonStyle}
    onClick={() => { logoutAndNotify(props.logout, props.notify) }}
    name="logout">logout</button>
)
const logoutAndNotify = (logout, notify) => {
  logout()
  notify('You have logged out', 'success')
}

export default connect(
  null,
  { logout, notify }

)(LogoutButton)

const buttonStyle = {
  cursor: 'pointer',
  float: 'right',
  fontFamily: 'Amaranth',
  fontWeight: 'bold',
  fontSize: '1em',
  width: '5em',
  height: '1.3em',
  marginRight: '10px',
  marginTop: '5px',
  color: '#DCDCDC',
  border: 'none',
  borderRadius: '5px',
  background: 'linear-gradient(70deg, #AAA, #000)'
}