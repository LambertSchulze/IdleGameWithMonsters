import { Provider } from 'react-redux'
import { store } from './services/store'
// import { StarterSelector } from './components/StarterSelector'
import { BattleScene } from './components/BattleScene/BattleScene'
import { BattleProvider } from './game/BattleContextProvider'

function App() {
  return (
    <Provider store={store}>
      {/* <StarterSelector starters={[1, 4, 7]} /> */}
      <BattleProvider enemy={16}>
        <BattleScene />
      </BattleProvider>
    </Provider>
  )
}

export default App
