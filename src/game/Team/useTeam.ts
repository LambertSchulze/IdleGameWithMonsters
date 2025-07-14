import { useContext } from 'react'
import { TeamContext } from './TeamContext'

export const useTeam = () => useContext(TeamContext)
