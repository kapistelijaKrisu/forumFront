import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'

const TopBar = ({ dude }) => {

  const loginOrLogout = dude === null ? <LoginForm />
    : <div style={menuStyle}>
      <Link style={topLinkStyle}  to="/" >Home</Link> &nbsp;
      <Link style={topLinkStyle}  to={'/dude/'+dude.dude_id} >Your posts</Link> &nbsp;
      <LogoutButton />
    </div>
  return (
    <div style={menuStyle}>
      {loginOrLogout}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dude: state.dude
  }
}
export default connect(
  mapStateToProps,
  {}

)(TopBar)

const topLinkStyle = {
  marginLeft:'2em',
  color: '#CDCDCD',
  fontSize: 28,
  fontStyle: 'bold',
  opacity:1.0
}

const menuStyle = {
  overflow: 'auto',
  minHeight: '1.6em',
  width: '100%',
  fontSize: 28,
  fontStyle: 'bold',
  background: 'linear-gradient(70deg, #333, #777)'
}