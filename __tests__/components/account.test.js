import Account from '../../src/components/account';
import React from 'react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {

  const component = renderer.create(
    <Account user="{uid: 320682, email: 'djmgguedes@gmail.com', hname: 'dylan', hasFacebook: false, hasTwitter: false, hasTwitter: false, planCode: 0}" />
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});