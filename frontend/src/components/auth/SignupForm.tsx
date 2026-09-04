"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button/Button";
import FormField from "@/components/ui/FormField/FormField";
import Input from "@/components/ui/Input/Input";

import {
  signupSchema,
  type SignupFormData,
} from "@/schemas/auth";

import styles from "./AuthForm.module.css";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema), mode: "onBlur" });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Signup data:", data);

    // API call will be added later.
  };

  return (
    <main className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className={styles.title}>Create Account</h1>

        <div className={styles.fields}>
          <FormField
            label="Name"
            htmlFor="name"
            required
            error={errors.name?.message}
          >
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              error={!!errors.name}
              {...register("name")}
            />
          </FormField>

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
              autoComplete="new-password"
              placeholder="Enter your password"
              error={!!errors.password}
              {...register("password")}
            />
          </FormField>

          <FormField
            label="Confirm Password"
            htmlFor="confirmPassword"
            required
            error={errors.confirmPassword?.message}
          >
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </FormField>

          <Button
            className={styles.button}
            type="submit"
            loading={isSubmitting}
          >
            Sign Up
          </Button>
        </div>

        <Link className={styles.link} href="/login">
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}

export default SignupForm;