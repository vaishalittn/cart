import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { connect } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';



const mapStateToProps = store =>store;

const Appcontainer = connect(mapStateToProps)(App);
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
)
export default Appcontainer;