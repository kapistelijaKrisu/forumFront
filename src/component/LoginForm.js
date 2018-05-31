import React from 'react'
import { connect } from 'react-redux'
import { login, register } from '../reducers/dude'
import { notify } from '../reducers/notification'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  signup = async (event) => {

    if (event.target.name === 'login') {
      try {
        await this.props.login(this.state.username, this.state.password)
        this.props.notify('Welcome back!', 'success')
      } catch (exception) {
        this.props.notify('username or password invalid')
      }
    } else {
      try {
        await this.props.register(this.state.username, this.state.password)
        this.props.notify('Welcome!', 'success')
      } catch (exception) {
        this.props.notify('username has to be minimum 3-31 characters long. password has to be 3-31 characters long')
      }
    }
  }


  render() {
    
    return (
      <div>
        <span style={textStyle}> user </span>
        <input
          style={teaxtAreaStyle}
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleLoginFieldChange}
        />
        <span style={textStyle}> password </span>
        <input
          style={teaxtAreaStyle}
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleLoginFieldChange}
        />
        <button style={buttonStyle} type="submit" name="login" onClick={this.signup}>login</button>
        <button style={buttonStyle} type="submit" name="register" onClick={this.signup}>register</button>
      </div>
    )
  }
}

export default connect(
  null,
  { login, register, notify }

)(LoginForm)

const textStyle = {
  padding: '0.8em',
  color: '#DCDCDC',
  fontFamily: 'Amaranth',
  fontWeight: 'bold'
}

const teaxtAreaStyle = {
  marginTop: '6px',
  width: '8em',
  height: '30px',
  marginLeft: '3px',
  color: '#444',
  borderRadius: '5px',
  background: 'DCDCDC',
  fontFamily: 'Amaranth',
  fontWeight: 'bold',
  fontSize: '1em'
}

const buttonStyle = {
  cursor: 'pointer',
  float: 'right',
  fontFamily: 'Amaranth',
  fontWeight: 'bold',
  fontSize: '1em',
  width: '5em',
  height: '1.3em',
  marginTop: '4px',
  marginRight: '10px',
  color: '#DCDCDC',
  border: 'none',
  borderRadius: '5px',
  background: 'linear-gradient(70deg, #000, #AAA)'
}