import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export const NotFound404 = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Упс..</h1>
        <p>Запрашиваемой страницы не существует</p>
        <br />
        <br />
        <p>проверьте искомый адрес, или перейдите на <Link to='/'>главную страницу</Link></p>
      </div>
    </div>
  );
}