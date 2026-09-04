import type { FormFieldProps } from "@/types/ui";

import styles from "./FormField.module.css";

const FormField = ({
  label,
  htmlFor,
  error,
  required = false,
  children,
}: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}

        {required && (
          <span aria-hidden="true" className={styles.required}>
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;