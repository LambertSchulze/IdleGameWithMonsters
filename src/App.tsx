import { Provider } from 'react-redux'
import { store } from './store/store'
import { Layout } from './components/Layout/Layout'
import { Game } from './game/Game'
import { StatsDashboard } from './components/StatsDashboard/StatsDashboard'
import { Menu } from './components/Menu/Menu'
import { Pokedex } from './components/Pokedex/Pokedex'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Menu />
        <Game />
        <Pokedex />
        <StatsDashboard />
      </Layout>
    </Provider>
  )
}

export default App
