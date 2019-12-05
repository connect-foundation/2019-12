import React from 'react';
import { mount } from 'enzyme';
import Btn from '.';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

describe('Atom / Btn', () => {
  it('[SNAPSHOT] StyledBtn 렌더링', () => {
    // given
    const wrapper = mount(<Btn styletype={'primary'} children={'Button'} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[SNAPSHOT] Anchor 렌더링', () => {
    // given
    const wrapper = mount(
      <Btn
        styletype={'primary'}
        children={'Button'}
        href={'https://naver.com'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[SNAPSHOT] StyledLink 렌더링', () => {
    // react-router-dom's Link 는 Router/Switch/Route 내부에만 위치 가능
    // given
    const wrapper = mount(
      <Router>
        <Switch>
          <Route path="/login">
            <Btn styletype={'primary'} children={'Button'} to={'/home'} />,
          </Route>
        </Switch>
      </Router>,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('content가 표시된다.', () => {
    // given
    const wrapper = mount(<Btn styletype={'primary'} children={'Button'} />);
    const buttonElement = wrapper.find('button');

    // then
    expect(buttonElement.text()).toBe('Button');
  });

  it('disabled prop에 따라 다른 스타일이 적용된다.', () => {
    // given
    const wrapperIsDisabled = mount(
      <Btn disabled={true} styletype={'primary'} children={'Button'} />,
    );
    const wrapperIsNotDisabled = mount(
      <Btn disabled={false} styletype={'primary'} children={'Button'} />,
    );

    // then
    expect(wrapperIsDisabled.prop('disabled')).toBe(true);
    expect(wrapperIsDisabled).toHaveStyleRule('cursor', 'default');
    expect(wrapperIsDisabled).toHaveStyleRule('pointer-events', 'none');

    expect(wrapperIsNotDisabled.prop('disabled')).toBe(false);
    expect(wrapperIsNotDisabled).toHaveStyleRule('cursor', 'pointer');
    expect(wrapperIsNotDisabled).toHaveStyleRule('pointer-events', 'auto');
  });

  it('fit prop에 따라 다른 스타일이 적용된다.', () => {
    // given
    const wrapperIsFit = mount(
      <Btn fit disabled styletype={'primary'} children={'Button'} />,
    );
    const wrapperIsNotFit = mount(
      <Btn disabled styletype={'primary'} children={'Button'} />,
    );
    // then
    expect(wrapperIsFit).toHaveStyleRule('height', 'auto');
    expect(wrapperIsFit).toHaveStyleRule('width', 'fit-content');
    expect(wrapperIsNotFit).toHaveStyleRule('height', '4rem');
    expect(wrapperIsNotFit).toHaveStyleRule('width', '18rem');
  });
});
