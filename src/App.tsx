import { Provider } from 'react-redux'
import { store } from './store/store'
import { Game } from './game/Game'

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

export default App
