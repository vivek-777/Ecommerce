"use client";

import Link from "next/dist/client/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button/Button";
import FormField from "@/components/ui/FormField/FormField";
import Input from "@/components/ui/Input/Input";

import { loginSchema, LoginFormData } from "@/schemas/auth";

// import { login } from "@/services/auth.service";

import styles from "./AuthForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
    //   await login(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main className={styles.container}>
        <form
            className={styles.form} 
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h1 className={styles.title}>Login</h1>
            <div className={styles.fields}>
                <FormField
                    label="Email"
                    htmlFor="email"
                    required
                    error={errors.email?.message}
                >
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        error={!!errors.email}
                        {...register("email")}
                    />
                </FormField>
                <FormField
                    label="Password"
                    htmlFor="password"
                    required
                    error={errors.password?.message}
                >
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        error={!!errors.password}
                        {...register("password")}
                    />
                </FormField>
                <Button
                    className={styles.button}
                    type="submit"
                    loading={isSubmitting}
                >
                    Login
                </Button>
            </div>

            <Link className={styles.link} href="/signup">
                Don't have an account? Sign up
            </Link>
        </form>
    </main>
  );
};

export default LoginForm;