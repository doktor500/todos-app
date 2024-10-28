import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormRegister = UseFormRegister<{ password: string }>;
type FormErrors = FieldErrors<{ password: string }>;

export const PasswordFormInput = ({ register, errors }: { register: FormRegister; errors: FormErrors }) => {
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
