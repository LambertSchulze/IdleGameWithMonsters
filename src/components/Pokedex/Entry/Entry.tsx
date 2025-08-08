import styles from './Entry.module.css'
import type { FC } from 'react'
import type { DeckEntry } from '../../../store/deckSlice'
import { skipToken } from '@reduxjs/toolkit/query'
import { useMonDetailQuery } from '../../../store/pokemonApi'
import { MonName } from '../../MonName/MonName'
import { Image } from '../../Image/Image'

type Props = Partial<DeckEntry>

export const Entry: FC<Props> = ({ name, spotted, caught }) => {
  const { data } = useMonDetailQuery(name ?? skipToken)

  return (
    <div className={styles[caught ? 'caught' : spotted ? 'spotted' : 'unknown']}>
      <Image front sprites={data?.sprites} className={styles.img} />
      <MonName name={name} smaller />
    </div>
  )
}
