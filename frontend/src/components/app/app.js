import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from "react-router-dom"
import Login from '../login'
import Home from '../home'
import './app.css'

class App extends Component {
  state = {
    data: null
  }

  /*
  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.win }))
      .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    const response = await fetch('/loterry')
    const body = await response.json()
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }
*/

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Bitcoin loterry</h1>
          <ul className="header">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/home">Home</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App