import Account from '../../src/components/account';
import React from 'react';
import renderer from 'react-test-renderer';

test('render method should return the correct content', () => {

  const component = renderer.create(
    <Account user="{uid: 320682, email: 'test@gmail.com', hname: 'test', hasFacebook: false, hasTwitter: false, hasTwitter: false, planCode: 0}" />
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});