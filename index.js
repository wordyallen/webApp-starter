import 'react-hot-loader/patch'
import React from 'react'
import { AppRegistry } from 'react-native'
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import {API} from './src/utils'
import App from './src/App'

const {registerComponent, runApplication} = AppRegistry
const publicInterface = createNetworkInterface({uri:`${API}/public`})
const privateInterface = createNetworkInterface({uri: `${API}/private`})




privateInterface.use([{
  applyMiddleware: (req, next) =>  {
    req.options.headers
      ? null
      : req.options.headers = {}
    req.options.headers.authorization = localStorage.getItem('token')
    next()
  }
}])


const client = new ApolloClient({
  networkInterface: localStorage.getItem('token') ? privateInterface : publicInterface
})


const renderApp = Component => {
  registerComponent('App', () => ()=>
    <AppContainer>
      <ApolloProvider client={client}>
        <HashRouter>
          <Component />
        </HashRouter>
      </ApolloProvider>
    </AppContainer>
  )
  runApplication('App', {rootTag: document.getElementById('root')})
}

renderApp(App)

module.hot ?  module.hot.accept('./src/App', () => renderApp(App) ) : null
