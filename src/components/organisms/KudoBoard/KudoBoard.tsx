import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import Segment from '../../atoms/Segment';
import { RepoList } from '../RepoList/RepoList';

import styles from './KudoBoard.module.css';

type KudoBoardProps = PropsWithChildren<{
    className?: string
}>

const KudoBoard: React.FC<KudoBoardProps> = ({ className }) => (
    <Segment className={ classNames(styles.container, className) }>
        <h2 className={ styles.header }>Shout out messageboard</h2>
        <RepoList data-testid="repo-list" />
    </Segment>
);

export default KudoBoard;
