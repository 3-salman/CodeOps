import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="menu-page-empty">
          <span className="menu-page-empty-emoji">⚠️</span>
          <h3>Something went wrong on this page</h3>
          <p>Please go back and try again.</p>
          <Link to="/">Back to home</Link>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary