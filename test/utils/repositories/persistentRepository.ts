import { Config, JsonDB } from "node-json-db";

import { isEmpty } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import Repository, { DB } from "@/test/utils/repositories/repository";

export class PersistentRepository<Entity extends { id: number }> implements Repository<Entity> {
  private readonly db;

  constructor(dbName: string) {
    try {
      this.db = new JsonDB(new Config(`${DB}/${dbName}`, true, true, "/"));
      this.db.resetData({});
    } catch (error) {
      console.error("[FileSystemRepository] error initializing file system repository", error);
    }
  }

  async get(id: number): Promise<Optional<Entity>> {
    return this.getItem(id);
  }

  async getAll(ids: number[] = []): Promise<Entity[]> {
    return this.getAllItems(ids);
  }

  async save(entity: Entity): Promise<number> {
    return this.saveItem(entity);
  }

  async saveAll(entities: Entity[]): Promise<number[]> {
    await Promise.all(entities.map((entity) => this.saveItem(entity)));

    return entities.map((entity) => entity.id);
  }

  async delete(id: number): Promise<void> {
    await this.deleteItem(id);
  }

  async deleteAll(entities: Entity[] = []): Promise<void> {
    return isEmpty(entities)
      ? await this.deleteAllItems()
      : await void Promise.all(entities.map((entity) => this.deleteItem(entity.id)));
  }

  private async getItem(id: number): Promise<Optional<Entity>> {
    try {
      return (await this.db?.getData(`/${id}`)) as Entity;
    } catch {
      return undefined;
    }
  }

  private async saveItem(entity: Entity) {
    const entityWithId = { ...entity, id: entity.id };
    await this.db?.push(`/${entity.id}`, entityWithId, true);

    return entity.id;
  }

  private async deleteItem(id: number) {
    await this.db?.delete(`/${id}`);
  }

  private async getAllItems(ids: number[] = []): Promise<Entity[]> {
    const entities = isEmpty(ids)
      ? await this.db?.getData("/").then((json) => Object.values(json))
      : await Promise.all(ids.map((id) => this.getItem(id)));

    return entities?.filter(Boolean) as Entity[];
  }

  private async deleteAllItems() {
    await this.db?.delete(`/`);
  }
}
