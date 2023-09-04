import React from 'react';

import styles from './Segment.module.css';

const Segment: React.FC = ({ children })  => (
    <div className={ styles.container }>
        { children }
    </div>
);

export default Segment;
