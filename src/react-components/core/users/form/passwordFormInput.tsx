import { Optional } from "@/modules/domain/utils/optionalUtils";
import { Input } from "@/react-components/ui/input";
import { Label } from "@/react-components/ui/label";

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
        defaultValue={value}
      />
      {errors && <p className="text-sm text-red-500">{errors}</p>}
    </div>
  );
};
