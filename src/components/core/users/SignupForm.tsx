"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";

import { createUser } from "@/actions/user/createUser";
import { type CreateUserData, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

type Register = UseFormRegister<{ username: string; email: string; password: string }>;
type Errors = FieldErrors<{ username: string; email: string; password: string }>;

const { LOGIN, TODOS } = Route;

export const SignUpForm = () => {
  const { redirectTo } = useRedirect();
  const { register, handleSubmit, formState } = useForm<CreateUserData>({ resolver: zodResolver(createUserSchema) });
  const { isLoading, errors } = formState;

  const onSubmit = async (data: CreateUserData) => {
    await createUser(data);
    redirectTo(TODOS);
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-gray-900">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <UsernameFormInput register={register} errors={errors} />
          <EmailFormInput register={register} errors={errors} />
          <PasswordFormInput register={register} errors={errors} />
          <SignupFormButton isLoading={isLoading} />
        </form>
      </CardContent>
      <CardFooter>
        <LoginFooter />
      </CardFooter>
    </Card>
  );
};

const UsernameFormInput = ({ register, errors }: { register: Register; errors: Errors }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">User name</Label>
      <Input
        id="username"
        aria-label="User name"
        type="text"
        placeholder="johndoe"
        {...register("username")}
        aria-invalid={errors.username ? "true" : "false"}
      />
      {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
    </div>
  );
};

const EmailFormInput = ({ register, errors }: { register: Register; errors: Errors }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        aria-label="Email"
        type="email"
        placeholder="john@example.com"
        {...register("email")}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
    </div>
  );
};

const PasswordFormInput = ({ register, errors }: { register: Register; errors: Errors }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        aria-label="Password"
        type="password"
        {...register("password")}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
    </div>
  );
};

const SignupFormButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" className="w-full font-bold" disabled={isLoading}>
      Sign Up
    </Button>
  );
};

const LoginFooter = () => {
  return (
    <p className="w-full text-center text-sm">
      Already have an account?
      <Link href={LOGIN} className="pl-2 text-primary hover:underline">
        Log in
      </Link>
    </p>
  );
};
