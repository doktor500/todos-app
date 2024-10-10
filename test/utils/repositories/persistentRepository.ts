import { Config, JsonDB } from "node-json-db";

import { isEmpty } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import Repository, { DB } from "@/test/utils/repositories/repository";

type Props = {
  name: string;
};

export const fakePersistentRepository = <Entity extends { id: number }>({ name }: Props): Repository<Entity> => {
  const db = new JsonDB(new Config(`${DB}/${name}`, true, true, "/"));

  const get = async (id: number): Promise<Optional<Entity>> => {
    return getItem(id);
  };

  const getAll = async (ids: number[] = []): Promise<Entity[]> => {
    return getAllItems(ids);
  };

  const save = async (entity: Entity): Promise<number> => {
    return saveItem(entity);
  };

  const saveAll = async (entities: Entity[]): Promise<number[]> => {
    await Promise.all(entities.map((entity) => saveItem(entity)));

    return entities.map((entity) => entity.id);
  };

  const deleteBy = async (id: number): Promise<void> => {
    await deleteItem(id);
  };

  const deleteAll = async (entities: Entity[] = []): Promise<void> => {
    return isEmpty(entities)
      ? await deleteAllItems()
      : await void Promise.all(entities.map((entity) => deleteItem(entity.id)));
  };

  const getItem = async (id: number): Promise<Optional<Entity>> => {
    try {
      return (await db?.getData(`/${id}`)) as Entity;
    } catch {
      return undefined;
    }
  };

  const saveItem = async (entity: Entity) => {
    const entityWithId = { ...entity, id: entity.id };
    await db?.push(`/${entity.id}`, entityWithId, true);

    return entity.id;
  };

  const deleteItem = async (id: number) => {
    await db?.delete(`/${id}`);
  };

  const getAllItems = async (ids: number[] = []): Promise<Entity[]> => {
    const entities = isEmpty(ids)
      ? await db?.getData("/").then((json) => Object.values(json))
      : await Promise.all(ids.map((id) => getItem(id)));

    return entities?.filter(Boolean) as Entity[];
  };

  const deleteAllItems = async () => {
    await db?.delete(`/`);
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
