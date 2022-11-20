import React from 'react';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children?: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div className={styles.layout}>
      {props.children}
    </div>
  );
}

export default Layout;
