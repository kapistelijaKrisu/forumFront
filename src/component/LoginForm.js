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
      } catch (exception) {
        this.props.notify('username or password invalid')
      }
    } else {
      try {
        await this.props.register(this.state.username, this.state.password)
      } catch (exception) {
        this.props.notify('username has to be minimum 3-31 characters long. password has to be 3-31 characters long')
      }
    }
    this.props.notify('Welcome!', 'success')


  }


  render() {
    return (
      <div>
        user
            <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleLoginFieldChange}
        />
        password
            <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleLoginFieldChange}
        />
        <button type="submit" name="login" onClick={this.signup}>login</button>
        <button type="submit" name="register" onClick={this.signup}>register</button>
      </div>
    )
  }
}

export default connect(
  null,
  { login, register, notify }

)(LoginForm)