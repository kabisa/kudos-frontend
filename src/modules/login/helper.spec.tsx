import { loginSuccess, LoginSuccessParams } from './helper';

describe('login helper', () => {
  it('calls localstorage', () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const params: LoginSuccessParams = {
      token: 'fakeToken',
      user: {
        id: '1',
      },
    };
    loginSuccess(params);

    expect(localStorage.setItem).toBeCalledWith('token', 'fakeToken');
    expect(localStorage.setItem).toBeCalledWith('user_id', '1');
  });
});
