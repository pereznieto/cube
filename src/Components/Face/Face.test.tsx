import { shallow } from 'enzyme';
import * as React from 'react';
import Face from './Face';

describe('Face', () => {
  it('should render without crashing', () => {
    shallow(<Face />);
  });

  it('should render Face as expected', () => {
    const component = shallow(<Face />);
    expect(component).toMatchSnapshot();
  });
});
