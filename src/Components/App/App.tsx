import * as React from 'react';
import TimerWrapper from '../TimerWrapper';
import styles from './App.scss';

const App = () => (
  <div className={styles['cube-app']} >
    <div className={styles['master-wrapper']}>
      <TimerWrapper />
    </div>
  </div>
);

export default App;
