// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <img src="../resources/images/gitlab-logo.png" alt="" className={styles.logo} />
          <input type="text" className={styles.token} placeholder="Token" />
          <Link to="/counter">
            <button className={styles.button}>Authorize</button>
          </Link>
        </div>
      </div>
    );
  }
}
