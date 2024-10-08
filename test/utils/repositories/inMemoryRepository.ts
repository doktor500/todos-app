import { isEmpty } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { clone } from "@/test/utils/objectUtils";
import Repository from "@/test/utils/repositories/repository";

const storage = new Map();

export const inMemoryRepository = <Entity extends { id: number }>(name: string): Repository<Entity> => {
  const repository = initializeRepository<Entity>(name);

  const get = async (id: number): Promise<Optional<Entity>> => {
    return repository.get(id);
  };

  const getAll = async (ids: number[] = []): Promise<Entity[]> => {
    const entities = Array.from(repository.values());

    return isEmpty(ids) ? entities : entities.filter((entity) => ids.includes(entity.id));
  };

  const save = async (entity: Entity): Promise<number> => {
    const clonedEntity = clone(entity);
    repository.set(entity.id, clonedEntity);

    return entity.id;
  };

  const saveAll = async (entities: Entity[]): Promise<number[]> => {
    return Promise.all(entities.map((entity) => save(entity)));
  };

  const deleteBy = async (id: number): Promise<void> => {
    repository.delete(id);
  };

  const deleteAll = async (entities: Entity[] = []): Promise<void> => {
    return isEmpty(entities) ? repository.clear() : void entities.map((entity) => void deleteBy(entity.id));
  };

  return {
    get,
    getAll,
    save,
    saveAll,
    delete: deleteBy,
    deleteAll,
  };
};

const initializeRepository = <Entity extends { id: number }>(name: string): Map<number, Entity> => {
  if (!storage.get(name)) storage.set(name, new Map<number, Entity>());

  return storage.get(name);
};
