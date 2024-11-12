"use client";

import { useActionState } from "react";

import { createUser } from "@/actions/user/createUser";
import { AppHeader } from "@/components/core/app/appHeader";
import { EmailFormInput } from "@/components/core/users/form/emailFormInput";
import { FormActionButton } from "@/components/core/users/form/formActionButton";
import { FormFooter } from "@/components/core/users/form/formFooter";
import { PasswordFormInput } from "@/components/core/users/form/passwordFormInput";
import { UsernameFormInput } from "@/components/core/users/form/usernameFormInput";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/router/appRouter";

const { LOGIN } = Route;

const Page = () => {
  const [state, action, pending] = useActionState(createUser, undefined);

  return (
    <>
      <AppHeader title="Pulse" isPending={pending} />
      <Card className="mx-auto w-full max-w-md bg-gray-900">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <UsernameFormInput value={state?.data?.username} errors={state?.errors.username} />
            <EmailFormInput value={state?.data?.email} errors={state?.errors.email} />
            <PasswordFormInput value={state?.data?.password} errors={state?.errors.password} />
            <FormActionButton isLoading={pending} value="Sign Up" />
          </form>
        </CardContent>
        <CardFooter>
          <FormFooter title="Already have an account?" link={LOGIN} value="Log in" />
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
