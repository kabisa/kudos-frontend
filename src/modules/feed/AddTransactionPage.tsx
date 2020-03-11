import React, {Component} from "react";

import {Toolbar} from "../../components/navigation";
import {CreatePost} from "./components";

import s from "./AddTransactionPage.module.scss";


export interface Props {
    transaction: any;
}

export class AddTransactionPage extends Component <Props> {
    render() {
        const {transaction} = this.props;
        return (
            <div className={s.root}>
                <Toolbar
                    text={transaction ? "Edit transaction" : "Create transaction"}
                />
                <div className={s.page}>
                    <CreatePost back={true}/>
                </div>
            </div>
        );
    }
}

export default AddTransactionPage;
