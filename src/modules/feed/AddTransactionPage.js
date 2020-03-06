import React, { Component } from "react";

import { Toolbar } from "../../components/navigation";
import { CreatePost } from "./components";
import { auth } from "../../support";

import s from "./AddTransactionPage.scss";

export class AddTransactionPage extends Component {
  constructor(props) {
    super(props);

    auth();
  }

  render() {
    const { transaction } = this.props;
    return (
      <div className={s.root}>
        <Toolbar
          text={transaction ? "Edit transaction" : "Create transaction"}
        />
        <div className={s.page}>
          <CreatePost back />
        </div>
      </div>
    );
  }
}
export default AddTransactionPage;
