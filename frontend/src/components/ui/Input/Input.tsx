import { forwardRef } from 'react';
import type { InputProps } from '@/types/ui';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${className ?? ''} ${error ? styles.error : ''}`}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;