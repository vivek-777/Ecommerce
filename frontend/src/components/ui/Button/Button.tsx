import type { ButtonProps } from "@/types/ui";

import styles from "./Button.module.css";

const Button = ({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;