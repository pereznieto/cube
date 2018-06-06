import { shallow } from 'enzyme';
import * as React from 'react';
import TimerWrapper from './TimerWrapper';

describe('TimerWrapper', () => {
  it('should render without crashing', () => {
    shallow(<TimerWrapper />);
  });

  it('should render TimerWrapper as expected', () => {
    const component = <TimerWrapper />;
    expect(component).toMatchSnapshot();
  });
});
