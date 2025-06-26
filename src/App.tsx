import { Provider } from 'react-redux'
import { store } from './services/store'
import { StarterSelector } from './components/StarterSelector'

function App() {
  return (
    <Provider store={store}>
      <h1>Idle Game with Monsters</h1>
      <StarterSelector starters={[1, 4, 7]} />
    </Provider>
  )
}

export default App
