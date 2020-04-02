import { loginSuccess, LoginSuccessParams } from './helper';

describe('login helper', () => {
  it('calls localstorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    const params: LoginSuccessParams = {
      token: 'fakeToken',
      user: {
        id: '1',
      },
    };
    loginSuccess(params);

    expect(spy).toBeCalledWith('token', 'fakeToken');
    expect(spy).toBeCalledWith('user_id', '1');
  });
});
