import { Optional } from "@/modules/domain/utils/optionalUtils";
import { isLocalEnvironment } from "@/modules/infrastructure/systemUtils.mjs";
import { inMemoryRepository } from "@/test/utils/repositories/inMemoryRepository";
import { persistentRepository } from "@/test/utils/repositories/persistentRepository";
import Repository from "@/test/utils/repositories/repository";

export type RepositoryProps = {
  persistent?: boolean;
  name: string;
};

export const fakeRepository = <Entity extends { id: number }>(props: RepositoryProps): Repository<Entity> => {
  const { name, persistent } = props;
  const isPersistent = persistent || isLocalEnvironment();
  const repository: Repository<Entity> = isPersistent ? persistentRepository<Entity>(name) : inMemoryRepository(name);

  return {
    get: (id: number): Promise<Optional<Entity>> => repository.get(id),
    getAll: (ids: number[] = []): Promise<Entity[]> => repository.getAll(ids),
    save: (entity: Entity): Promise<number> => repository.save(entity),
    saveAll: (entities: Entity[]): Promise<number[]> => repository.saveAll(entities),
    delete: (id: number): Promise<void> => repository.delete(id),
    deleteAll: (entities: Entity[] = []): Promise<void> => repository.deleteAll(entities),
  };
};
