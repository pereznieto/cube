import React, { Component } from 'react';
import cx from 'classnames';
import { isEqual } from 'lodash';
import { getRandomColour } from '../../utilities/formatters';
import styles from './Face.scss';

interface Props {
  colourAllocations?: Colour[][];
  shouldRandomise?: boolean;
}

interface State {
  colours: Colour[][];
}

export enum Colour {
  W = 'white',
  Y = 'yellow',
  R = 'red',
  O = 'orange',
  B = 'blue',
  G = 'green',
}

class Face extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      colours: [
        [Colour.Y, Colour.Y, Colour.Y],
        [Colour.Y, Colour.Y, Colour.Y],
        [Colour.Y, Colour.Y, Colour.Y],
      ],
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { colourAllocations, shouldRandomise } = this.props;
    const { colours } = this.state;
    const defaultColours = [
      [Colour.Y, Colour.Y, Colour.Y],
      [Colour.Y, Colour.Y, Colour.Y],
      [Colour.Y, Colour.Y, Colour.Y],
    ];

    if (
      !isEqual(prevProps.colourAllocations, colourAllocations) &&
      !isEqual(colourAllocations, colours)
    ) {
      colourAllocations && this.setState({ colours: colourAllocations });
    }

    if (prevProps.shouldRandomise !== shouldRandomise) {
      if (shouldRandomise) {
        this.interval = setInterval(() => this._colourTicker(), 100);
      } else {
        clearInterval(this.interval);
      }
    }

    if (!colourAllocations && !shouldRandomise && !isEqual(colours, defaultColours)) {
      this.setState({ colours: defaultColours });
    }
  }

  private interval: NodeJS.Timer;

  private _colourTicker = () => {
    this.setState({ colours: [
      [getRandomColour(), getRandomColour(), getRandomColour()],
      [getRandomColour(), getRandomColour(), getRandomColour()],
      [getRandomColour(), getRandomColour(), getRandomColour()],
    ] });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { colours } = this.state;
    const verticalPositions = ['top', 'middle', 'bottom'];
    const horizontalPositions = ['left', 'centre', 'right'];

    return (
      <div className={styles['face']} >
        {
          verticalPositions.map((vPosition: string, vIndex) =>
            horizontalPositions.map((hPosition: string, hIndex) => (
              <div
                className={cx(
                  styles['sticker'],
                  styles[`sticker--${vPosition}`],
                  styles[`sticker--${hPosition}`],
                  styles[`sticker--${colours[vIndex][hIndex]}`])}
              />
            )),
          )
        }
      </div>
    );
  }
}

export default Face;
