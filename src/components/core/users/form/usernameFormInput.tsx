import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Props = {
  value: Optional<string>;
  errors: Optional<Array<string>>;
};

export const UsernameFormInput = ({ value, errors }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">User name</Label>
      <Input
        id="username"
        name="username"
        aria-label="User name"
        type="text"
        placeholder="johndoe"
        aria-invalid={errors ? "true" : "false"}
        defaultValue={value}
      />
      {errors && <p className="text-sm text-red-500">{errors}</p>}
    </div>
  );
};