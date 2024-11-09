import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Errors = {
  email?: Optional<Array<string>>;
};

export const EmailFormInput = ({ errors }: { errors: Optional<Errors> }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        aria-label="Email"
        type="email"
        placeholder="john@example.com"
        aria-invalid={errors?.email ? "true" : "false"}
      />
      {errors?.email && <p className="text-sm text-red-500">{errors.email}</p>}
    </div>
  );
};
