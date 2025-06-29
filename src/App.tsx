import { Provider } from 'react-redux'
import { store } from './store/store'
import { Layout } from './components/Layout/Layout'
import { Game } from './game/Game'
import { StatsDashboard } from './components/StatsDashboard/StatsDashboard'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Game />
        <StatsDashboard />
      </Layout>
    </Provider>
  )
}

export default App
