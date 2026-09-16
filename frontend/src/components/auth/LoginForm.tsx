"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button/Button";
import FormField from "@/components/ui/FormField/FormField";
import Input from "@/components/ui/Input/Input";

import { login } from "@/services/auth.service";
import { loginSchema, LoginFormData } from "@/schemas/auth";

import styles from "./AuthForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data);

            console.log("Login successful", response);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
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
            <Button
                className={styles.googleButton}
                type="button"
                onClick={handleGoogleLogin}
            >
                <Image
                    src="/google-oauth.png"
                    alt="Sign in with Google"
                    width={180}
                    height={40}
                />
            </Button>

            <Link className={styles.link} href="/signup">
                {`Don't have an account? Sign up`}
            </Link>
        </form>
    </main>
  );
};

export default LoginForm;