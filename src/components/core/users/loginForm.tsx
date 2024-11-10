"use client";

import { useActionState, useEffect } from "react";

import { loginUser } from "@/actions/user/loginUser";
import { logoutUser } from "@/actions/user/logoutUser";
import { EmailFormInput } from "@/components/core/users/form/emailFormInput";
import { FormActionButton } from "@/components/core/users/form/formActionButton";
import { FormFooter } from "@/components/core/users/form/formFooter";
import { PasswordFormInput } from "@/components/core/users/form/passwordFormInput";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/router/appRouter";

const { SIGNUP } = Route;

export const LoginForm = () => {
  const [state, action, pending] = useActionState(loginUser, undefined);

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <Card className="mx-auto w-full max-w-md bg-gray-900">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <EmailFormInput errors={state?.errors} />
          <PasswordFormInput errors={state?.errors} />
          <FormActionButton isLoading={pending} value="Log in" />
        </form>
      </CardContent>
      <CardFooter>
        <FormFooter title="Don't have an account?" link={SIGNUP} value="Sign Up" />
      </CardFooter>
    </Card>
  );
};
