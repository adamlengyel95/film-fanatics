import React, { Component } from 'react'
import styles from './SideNavigation.module.css'

class SideNavigation extends Component {
  render() {
    return (
      <div className={styles.SideNavigation}>
          <ul>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="http://localhost:3000">Színészek/Színésznők</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="http://localhost:3000">Műfajok</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="http://localhost:3000">Filmek</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="http://localhost:3000">Rendezők</a>
              </li>
          </ul>
      </div>
    )
  }
}

export default SideNavigation;
