import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { MAX_PASSWORD_LENGTH } from "@/modules/domain/utils/stringUtils";

type Props = {
  value: Optional<string>;
  errors: Optional<Array<string>>;
};

export const PasswordFormInput = ({ value, errors }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        aria-label="Password"
        type="password"
        aria-invalid={errors ? "true" : "false"}
        maxLength={MAX_PASSWORD_LENGTH}
        defaultValue={value}
      />
      {errors && <p className="text-sm text-red-500">{errors}</p>}
    </div>
  );
};
