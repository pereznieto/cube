import React, { Component } from 'react';
import cx from 'classnames';
import Timer from '../Timer';
import {
  prettifyTime,
  average,
  getScramble,
  getMin,
  getMax,
} from '../../utilities/formatters';
import styles from './TimerWrapper.scss';

interface Props {}

interface State {
  shouldTimerRun: boolean;
  previousTimes: number[];
  isLoading: boolean;
  isReady: boolean;
}

class TimerWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldTimerRun: false,
      previousTimes: [],
      isLoading: false,
      isReady: false,
    };
    this._loadAndReady = this._loadAndReady.bind(this);
    this._runner = this._runner.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this._loadAndReady);
    window.addEventListener('keyup', this._runner);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._loadAndReady);
    window.removeEventListener('keyup', this._runner);
  }

  private _loadAndReady = (event: any) => {
    if (event.which === 32) {
      event.preventDefault();

      if (this.state.shouldTimerRun) {
        this.setState({
          shouldTimerRun: false,
          isLoading: false,
          isReady: false,
        });
      } else if (!this.state.isLoading && !this.state.isReady) {
        this.setState({ isLoading: true });

        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }

        this.loadingTimeout = setTimeout(() => { this.setState({ isReady: true, isLoading: false }); }, 800);
      }
    }
  }

  private _runner = (event: any) => {
    if (event.which === 32) {
      event.preventDefault();

      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }

      if (this.state.isReady) {
        this.setState({ shouldTimerRun: true, isReady: false });
      } else {
        this.setState({ isLoading: false });
      }
    }
  }

  private loadingTimeout: NodeJS.Timer;

  render() {
    const { shouldTimerRun, isLoading, isReady, previousTimes } = this.state;
    const getSpaceMessage = () => {
      const startOrStop = shouldTimerRun ? 'stop' : 'start';

      if (!shouldTimerRun && isReady) {
        return `Release to ${startOrStop}`;
      }

      if (!shouldTimerRun && !isReady && isLoading) {
        return 'Hold';
      }

      if (shouldTimerRun) {
        return `Press space to ${startOrStop}`;
      }

      return `Press space to ${startOrStop}`;
    };

    return (
      <div
        className={cx(styles['timer-wrapper'], {
          [`${styles['running']}`]: shouldTimerRun,
          [`${styles['loading']}`]: isLoading,
          [`${styles['ready']}`]: isReady,
        })}
      >
        <Timer
          isRunning={shouldTimerRun}
          isLoading={isLoading}
          isReady={isReady}
          callback={(count: number) => { this.setState({ previousTimes: [count, ...previousTimes] }); }}
        />
        <p className={styles['space-message']}>{getSpaceMessage()}</p>
        {!shouldTimerRun && !isLoading && !isReady && <div className={styles['scramble']}>{getScramble(20)}</div>}
        {!shouldTimerRun && previousTimes.length > 0 &&
          <div className={cx(styles['previous-times'], styles['grid'], styles['md-up'])}>
            <div className={cx(styles['cell'], styles['previous-times__average__wrapper'])}>
              <h3 className={styles['previous-times__title']}>Average:</h3>
              <div className={styles['previous-times__average']}>{prettifyTime(average(previousTimes))}</div>
            </div>
            <div className={styles['cell']}>
              <h3 className={styles['previous-times__title']}>Times:</h3>
              <ul className={styles['previous-times__list']}>
                {previousTimes.map((time: number, index) =>
                  <li className={styles['previous-times__item']} key={`${index}-${time}`}>
                    <span className={styles['previous-times__index']}>{previousTimes.length - index}. </span>
                    <span
                      className={cx(styles['previous-times__time'], {
                        [`${styles['previous-times__time--min']}`]: time === getMin(previousTimes),
                        [`${styles['previous-times__time--max']}`]: time === getMax(previousTimes),
                      })}
                      data-milliseconds={time}
                    >
                      {prettifyTime(time)}
                    </span>
                  </li>)}
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default TimerWrapper;
