import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './SideNavigation.module.css'

class SideNavigation extends Component {
  goToActorsPage = () => {
    this.props.history.push(`/movie/${this.props.id}`)
  }
  render() {
    return (
      <div className={styles.SideNavigation}>
        <ul>
          <li className={styles.SideNavItem}>
            <Link to="/actors" className={styles.SideNavLink}>Színészek/Színésznők</Link>
          </li>
          <li className={styles.SideNavItem}>
            <a className={styles.SideNavLink} href="http://localhost:3000">Műfajok</a>
          </li>
          <li className={styles.SideNavItem}>
            <Link to="/movies" className={styles.SideNavLink}>Filmek</Link>
          </li>
          <li className={styles.SideNavItem}>
            <Link to="/directors" className={styles.SideNavLink}>Rendezők</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideNavigation;
