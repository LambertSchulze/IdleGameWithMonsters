import type { FC } from 'react'
import type { DeckEntry } from '../../../store/deckSlice'

type Props = DeckEntry

export const Entry: FC<Props> = ({ name, spotted, caught }) => {
  return (
    <div>
      <p>{name}</p>
      <p>seen on: {spotted}</p>
      {caught && <p>'CAUGHT'</p>}
    </div>
  )
}
