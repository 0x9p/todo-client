import React from 'react';

import styles from './Panel.module.scss';

export interface PanelProps {
  children?: React.ReactNode;
}

function Panel(props: PanelProps) {
  return (
    <div className={styles.panel}>
      {props.children}
    </div>
  );
}

export default Panel;
