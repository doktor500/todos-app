import { Optional } from "@/modules/domain/utils/optionalUtils";

export const ErrorMessages = ({ errors }: { errors: Optional<Array<string>> }) => {
  return errors && <p className="text-sm text-pink-600">{errors}</p>;
};
