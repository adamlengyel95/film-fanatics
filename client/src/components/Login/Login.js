import React, { Component } from 'react'

import styles from './Login.module.css';

export class Login extends Component {
  render() {
    return (
      <div className={styles.LoginContainer}>
        <h2 className={styles.LoginTitle}>Bejelentkezés</h2>
        <div className={styles.ButtonContainer}>
            <a className={styles.LoginButton} href="http://localhost:5000/auth/google">Bejelentkezés Google fiókkal +</a>   
        </div>
      </div>
    )
  }
}

export default Login
