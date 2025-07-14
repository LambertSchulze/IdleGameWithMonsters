import { useContext } from 'react'
import { StageContext } from './StageContext'

export const useStage = () => useContext(StageContext)
