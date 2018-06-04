import { shallow } from 'enzyme';
import * as React from 'react';
import Timer from './Timer';

const props = {
  isRunning: true,
};

describe('Timer', () => {
  it('should render without crashing', () => {
    shallow(<Timer {...props} />);
  });

  it('should render Timer as expected', () => {
    const component = shallow(<Timer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
