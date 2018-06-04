import { shallow } from 'enzyme';
import * as React from 'react';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });

  it('should render App as expected', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
