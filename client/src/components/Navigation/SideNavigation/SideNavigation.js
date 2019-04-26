import React, { Component } from 'react'
import styles from './SideNavigation.module.css'
import classes from './SideNavigation.module.css';

class SideNavigation extends Component {
  render() {
    return (
      <div className={styles.SideNavigation}>
          <ul>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="#">Színészek/Színésznők</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="#">Műfajok</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="#">Filmek</a>
              </li>
              <li className={styles.SideNavItem}>
                <a className={styles.SideNavLink} href="#">Rendezők</a>
              </li>
          </ul>
      </div>
    )
  }
}

export default SideNavigation;
