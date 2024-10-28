import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormRegister = UseFormRegister<{ email: string }>;
type FormErrors = FieldErrors<{ email: string }>;

export const EmailFormInput = ({ register, errors }: { register: FormRegister; errors: FormErrors }) => {
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
