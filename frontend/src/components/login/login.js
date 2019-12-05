import React, { Component } from "react"
import './login.css'

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { login: '', pass: '' }
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:5000/auth", {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "body": "user=admin&pass=123",
      "method": "POST"
    })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <span>
          <input placeholder="Login" type="text" value={this.state.user} onChange={
            (ev) => this.setState({ user: ev.target.value })} />
        </span>
        <span>
          <input placeholder="Password" type="text" value={this.state.pass} onChange={
            (ev) => this.setState({ pass: ev.target.value })} />
        </span>
      </div >
    )
  }
}

export default Login