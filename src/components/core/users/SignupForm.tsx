"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createUser } from "@/actions/user/createUser";
import { type CreateUserData, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import { EmailFormInput } from "@/components/core/users/form/emailFormInput";
import { FormActionButton } from "@/components/core/users/form/formActionButton";
import { FormFooter } from "@/components/core/users/form/formFooter";
import { PasswordFormInput } from "@/components/core/users/form/passwordFormInput";
import { UsernameFormInput } from "@/components/core/users/form/usernameFormInput";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

const { LOGIN } = Route;

export const SignUpForm = () => {
  const { redirectTo } = useRedirect();
  const { register, handleSubmit, formState } = useForm<CreateUserData>({ resolver: zodResolver(createUserSchema) });
  const { isLoading, errors } = formState;

  const onSubmit = async (data: CreateUserData) => {
    await createUser(data);
    redirectTo("/");
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
          <FormActionButton isLoading={isLoading} value="Sign Up" />
        </form>
      </CardContent>
      <CardFooter>
        <FormFooter title="Already have an account?" link={LOGIN} value="Log in" />
      </CardFooter>
    </Card>
  );
};
