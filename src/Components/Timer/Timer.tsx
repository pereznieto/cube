import React, { Component } from 'react';
import cx from 'classnames';
import { formatTime } from '../../utilities/formatters';
import styles from './Timer.scss';

interface Props {
  isRunning: boolean;
  isLoading: boolean;
  isReady: boolean;
  callback?: (count: number) => void;
}

interface State {
  count: number;
}

class Timer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  private interval: NodeJS.Timer;

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { isRunning, callback } = this.props;
    const { count } = this.state;

    if (prevProps.isRunning !== isRunning) {
      if (isRunning) {
        if (count > 0) {
          this.setState({ count: 0 });
        }
        this.interval = setInterval(() => this._tick(), 10);
      } else {
        clearInterval(this.interval);
        callback && callback(count);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  private _tick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    const { isRunning, isLoading, isReady } = this.props;
    const { count } = this.state;
    const [minutes, seconds, tenths, hundredths] = (isRunning || count > 0) ? formatTime(count) : [0, '00', 0, 0];

    return (
      <div
        className={cx(styles['timer'], {
          [`${styles['running']}`]: isRunning,
          [`${styles['loading']}`]: isLoading,
          [`${styles['ready']}`]: isReady,
        })}
      >
        <p className={styles['time']}>
          {minutes ? <span className={styles['minutes']}>{minutes}:</span> : null}
          <span className={styles['seconds']}>{seconds}</span>
          <span className={styles['dot']}>.</span>
          <span className={styles['tenths']}>{tenths}</span>
          <span className={styles['hundredths']}>{hundredths}</span>
        </p>
      </div>
    );
  }
}

export default Timer;
