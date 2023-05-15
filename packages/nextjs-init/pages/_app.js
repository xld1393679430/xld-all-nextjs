import { Component } from 'react'
import '../styles/globals.css'

class MyApp extends Component {

  componentDidMount() {
    const el = document.getElementById("AA")
    console.log("---MyApp--componentDidMount---", el)
  }

  render() {
    const { pageProps, Component } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
