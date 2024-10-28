"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginUser } from "@/actions/user/loginUser";
import { type LoginUserData, loginUserSchema } from "@/actions/user/schemas/loginUserSchema";
import { EmailFormInput } from "@/components/core/users/form/emailFormInput";
import { FormActionButton } from "@/components/core/users/form/formActionButton";
import { FormFooter } from "@/components/core/users/form/formFooter";
import { PasswordFormInput } from "@/components/core/users/form/passwordFormInput";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

const { SIGNUP, HOME } = Route;

export const LoginForm = () => {
  const { redirectTo } = useRedirect();
  const { register, handleSubmit, formState } = useForm<LoginUserData>({ resolver: zodResolver(loginUserSchema) });
  const { isLoading, errors } = formState;

  const onSubmit = async (data: LoginUserData) => {
    await loginUser(data);
    redirectTo(HOME);
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-gray-900">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <EmailFormInput register={register} errors={errors} />
          <PasswordFormInput register={register} errors={errors} />
          <FormActionButton isLoading={isLoading} value="Log in" />
        </form>
      </CardContent>
      <CardFooter>
        <FormFooter title="Don't have an account?" link={SIGNUP} value="Sign Up" />
      </CardFooter>
    </Card>
  );
};
