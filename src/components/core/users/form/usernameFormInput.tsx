import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Errors = {
  username?: Optional<Array<string>>;
};

export const UsernameFormInput = ({ errors }: { errors: Optional<Errors> }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">User name</Label>
      <Input
        id="username"
        name="username"
        aria-label="User name"
        type="text"
        placeholder="johndoe"
        aria-invalid={errors?.username ? "true" : "false"}
      />
      {errors?.username && <p className="text-sm text-red-500">{errors.username}</p>}
    </div>
  );
};
