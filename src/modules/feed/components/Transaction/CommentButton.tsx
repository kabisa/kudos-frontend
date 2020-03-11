import React from "react";
import {Button, Icon} from "semantic-ui-react";

export interface Props {
    transactionId: string;
    text: string;
}

const CommentButton: React.FC<Props> = ({transactionId, text}) => (
    <Button size="mini" basic className="button-action">
        <Icon name="comment outline"/>
        {text}
    </Button>
);

export default CommentButton;
