import styles from './Entry.module.css'
import { type FC } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { type DeckEntry, teamMembers } from '../../../store/deckSlice'
import { useAppSelector } from '../../../store/store'
import { useMonDetailQuery } from '../../../store/pokemonApi'
import { MonName } from '../../MonName/MonName'
import { Image } from '../../Image/Image'
import { toClassName } from '../../../helpers/toClassNames'

type Props = Partial<DeckEntry>

export const Entry: FC<Props> = ({ name, spotted, caught }) => {
  const inTeam = useAppSelector(teamMembers).some(entry => entry.name === name)
  const { data } = useMonDetailQuery(name ?? skipToken)

  const handleClick = () => {}

  return (
    <div
      className={toClassName(
        caught && styles.caught,
        spotted && styles.spotted,
        inTeam && styles.inTeam
      )}
    >
      <Image front sprites={data?.sprites} />
      <MonName name={name} smaller />
      {caught && <input type="checkbox" checked={inTeam} onChange={handleClick} />}
    </div>
  )
}
