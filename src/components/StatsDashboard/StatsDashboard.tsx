import { useAppSelector } from '../../store/store'

export const StatsDashboard = () => {
  const runState = useAppSelector(state => state.runState)

  return (
    <div>
      <h2>Stats</h2>
      <dl>
        <dt>Starters:</dt>
        <dd>{runState.starterMons.join(' or ')}</dd>

        <dt>Enemies:</dt>
        <dd>{runState.encounters.join(' or ')}</dd>
      </dl>
    </div>
  )
}
