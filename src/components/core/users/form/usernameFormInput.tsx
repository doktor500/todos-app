import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormRegister = UseFormRegister<{ username: string }>;
type FormErrors = FieldErrors<{ username: string }>;

export const UsernameFormInput = ({ register, errors }: { register: FormRegister; errors: FormErrors }) => {
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
