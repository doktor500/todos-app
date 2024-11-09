"use client";

import { useActionState } from "react";

import { createUser } from "@/actions/user/createUser";
import { EmailFormInput } from "@/components/core/users/form/emailFormInput";
import { FormActionButton } from "@/components/core/users/form/formActionButton";
import { FormFooter } from "@/components/core/users/form/formFooter";
import { PasswordFormInput } from "@/components/core/users/form/passwordFormInput";
import { UsernameFormInput } from "@/components/core/users/form/usernameFormInput";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/router/appRouter";

const { LOGIN } = Route;

export const SignUpForm = () => {
  const [state, action, pending] = useActionState(createUser, undefined);

  return (
    <Card className="mx-auto w-full max-w-md bg-gray-900">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <UsernameFormInput errors={state?.errors} />
          <EmailFormInput errors={state?.errors} />
          <PasswordFormInput errors={state?.errors} />
          <FormActionButton isLoading={pending} value="Sign Up" />
        </form>
      </CardContent>
      <CardFooter>
        <FormFooter title="Already have an account?" link={LOGIN} value="Log in" />
      </CardFooter>
    </Card>
  );
};
