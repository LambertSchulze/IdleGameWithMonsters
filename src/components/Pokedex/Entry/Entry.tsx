import styles from './Entry.module.css'
import { type FC } from 'react'
import { toClassName } from '../../../helpers/toClassNames'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { removeFromTeam, addToTeam, teamMembers } from '../../../store/deckSlice'
import { useMonDetailQuery, type MonName as MonNameType } from '../../../store/pokemonApi'
import { MonName } from '../../MonName/MonName'
import { Image } from '../../Image/Image'

type Props = {
  name: MonNameType
  spotted: number
  caught?: number
}

export const Entry: FC<Props> = ({ name, spotted, caught }) => {
  const dispatch = useAppDispatch()
  const inTeam = useAppSelector(teamMembers).some(entry => entry.name === name)
  const { data } = useMonDetailQuery(name)

  const handleClick = () => {
    if (inTeam) dispatch(removeFromTeam(name))
    else dispatch(addToTeam(name))
  }

  return (
    <div
      className={toClassName(
        spotted && styles.spotted,
        caught && styles.caught,
        inTeam && styles.inTeam
      )}
    >
      <Image front sprites={data?.sprites} />
      <MonName name={name} smaller />
      {caught && <input type="checkbox" checked={inTeam} onChange={handleClick} />}
    </div>
  )
}
