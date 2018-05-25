import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Menu = ({dude}) => {

    
    const active = {
      fontWeight: 'bold',
      color: 'yellow',
      background: 'purple'
    }
  
  const personalPage = '/dude/'+dude.dudeid
    return (
      <div>
        <NavLink exact to="/" activeStyle={active}>home</NavLink> &nbsp;
      <NavLink to={personalPage} activeStyle={active}>create new</NavLink> &nbsp;
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
  
  )(Menu)