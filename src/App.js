import React from 'react'
import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )
}

export default App