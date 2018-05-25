import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import Menu from './Menu'

const TopBar = ({ dude }) => {

  const menuStyle = {
    textAlign: 'center',
    fontSize: 28,
    paddingTop: 3,
    paddingLeft: 22,
    fontStyle: 'italic',
    marginBottom: 1,
    background: 'lightblue'
  }

  const loginOrLogout = dude === null ? <LoginForm />
    : <div style={menuStyle}>
      <Menu />
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