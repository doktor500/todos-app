import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optional";

interface UsersRepository {
  findById(id: number): Promise<Optional<User>>;
}

export default UsersRepository;
