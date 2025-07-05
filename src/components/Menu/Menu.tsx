import styles from './Menu.module.css'

export const Menu = () => {
  return (
    <menu className={styles.menu}>
      <li>
        <button popoverTarget="pokedex-dashboard">Pokedex</button>
      </li>
      <li>
        <button popoverTarget="stats-dashboard">Stats</button>
      </li>
    </menu>
  )
}
