import React, { Component } from 'react';
import Timer from '../Timer';
import { prettifyTime, average } from '../../utilities/formatters';
import styles from './TimerWrapper.scss';

interface Props {}

interface State {
  shouldTimerRun: boolean;
  previousTimes: number[];
}

class TimerWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldTimerRun: false,
      previousTimes: [],
    };
  }

  render() {
    const { shouldTimerRun, previousTimes } = this.state;

    return (
      <div className={styles['timer-wrapper']} >
        <Timer
          isRunning={shouldTimerRun}
          callback={(count: number) => { this.setState({ previousTimes: [count, ...previousTimes] }); }}
        />
        <button
          onClick={() => {
            this.setState({ shouldTimerRun: !shouldTimerRun });
          }}
          className={styles['button--start-stop']}
        >
          {shouldTimerRun ? 'Stop' : 'Start'}
        </button>
        {previousTimes.length > 0 &&
          <div className={styles['previous-times']}>
            <h3 className={styles['previous-times__title']}>Previous times:</h3>
            <ul className={styles['previous-times__list']}>
              {previousTimes.map((time: number, index) =>
                <li className={styles['previous-times__item']} key={`${index}-${time}`}>
                  <span className={styles['previous-times__index']}>{previousTimes.length - index}. </span>
                  <span className={styles['previous-times__time']}>{prettifyTime(time)}</span>
                </li>)}
            </ul>
            <h3 className={styles['previous-times__average-title']}>Average:</h3>
            <div className={styles['previous-times__average']}>{prettifyTime(average(previousTimes))}</div>
          </div>
        }
      </div>
    );
  }
}

export default TimerWrapper;
