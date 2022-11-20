import React from 'react';
import classNames from "classnames";

import styles from './Button.module.scss';

export interface ButtonProps {
  text: string;
  active?: boolean;
  onClick(): void;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, { [styles.active]: props.active })}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
