import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Errors = {
  password?: Optional<Array<string>>;
};

export const PasswordFormInput = ({ errors }: { errors: Optional<Errors> }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        aria-label="Password"
        type="password"
        aria-invalid={errors?.password ? "true" : "false"}
      />
      {errors?.password && <p className="text-sm text-red-500">{errors.password}</p>}
    </div>
  );
};
