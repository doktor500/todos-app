import { Optional } from "@/modules/domain/utils/optionalUtils";
import { persistentRepository } from "@/test/utils/repositories/persistentRepository";
import Repository from "@/test/utils/repositories/repository";

export type RepositoryProps = {
  name: string;
};

export const fakeRepository = <Entity extends { id: number }>(props: RepositoryProps): Repository<Entity> => {
  const { name } = props;
  const repository: Repository<Entity> = persistentRepository<Entity>(name);

  return {
    get: (id: number): Promise<Optional<Entity>> => repository.get(id),
    getAll: (ids: number[] = []): Promise<Entity[]> => repository.getAll(ids),
    save: (entity: Entity): Promise<number> => repository.save(entity),
    saveAll: (entities: Entity[]): Promise<number[]> => repository.saveAll(entities),
    delete: (id: number): Promise<void> => repository.delete(id),
    deleteAll: (entities: Entity[] = []): Promise<void> => repository.deleteAll(entities),
  };
};
