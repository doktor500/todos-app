import { ErrorMessages } from "@/components/core/users/form/errorMessages";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Props = {
  value: Optional<string>;
  errors: Optional<Array<string>>;
};

export const EmailFormInput = ({ value, errors }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        aria-label="Email"
        type="email"
        placeholder="john@example.com"
        autoComplete="email"
        aria-invalid={errors ? "true" : "false"}
        defaultValue={value}
      />
      <ErrorMessages errors={errors} />
    </div>
  );
};
