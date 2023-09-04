import React from 'react';

import { Navigation } from '../navigation';

import styles from './Page.module.css';

const Page: React.FC = ({ children })  => (
    <div className={ styles.page }>
        <Navigation />
        <main className={ styles.main}>
            { children }
        </main>
    </div>
);

export default Page;
