import { loginSuccess, LoginSuccessParams } from "./helper";
import { Storage } from "../../support/storage";

describe("login helper", () => {
  it("calls localstorage", () => {
    Storage.setItem = jest.fn();

    const params: LoginSuccessParams = {
      token: "fakeToken",
      user: {
        id: "1",
      },
    };
    loginSuccess(params);

    expect(Storage.setItem).toBeCalledWith("token", "fakeToken");
    expect(Storage.setItem).toBeCalledWith("user_id", "1");
  });
});
