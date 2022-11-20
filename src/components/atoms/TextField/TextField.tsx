import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import styles from './TextField.module.scss';

export interface TextFieldProps {
  value?: string;
  placeholder?: string;
  onUpdate(content: string): void;
}

function TextField(props: TextFieldProps) {
  const [value, setValue] = useState(props.value || '');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, [setValue]);

  const onUpdate = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const content = (value || '').trim();

      if (content) {
        props.onUpdate(content);
        setValue('');
      }
    }
  }, [props, value, setValue]);

  return (
    <input
      className={styles.textField}
      placeholder={props.placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onUpdate}
    />
  );
}

export default TextField;
