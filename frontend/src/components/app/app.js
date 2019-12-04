import React, { Component } from 'react';
import './app.css';

class App extends Component {
  state = {
    data: null
  }

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

  render() {
    return (
      <div className="App">
        Welcome to React
      </div>
    )
  }
}

export default App