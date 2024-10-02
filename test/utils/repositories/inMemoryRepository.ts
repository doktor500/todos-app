import { isEmpty } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { clone } from "@/test/utils/objectUtils";
import Repository from "@/test/utils/repositories/repository";

export default class InMemoryRepository<Entity extends { id: number }> implements Repository<Entity> {
  private readonly storage: Map<string, Entity>;

  constructor(storage: Map<string, Entity>) {
    this.storage = storage;
  }

  async get(id: number): Promise<Optional<Entity>> {
    return this.storage.get(id.toString());
  }

  async getAll(ids: number[] = []): Promise<Entity[]> {
    const entities = Array.from(this.storage.values());

    return isEmpty(ids) ? entities : entities.filter((entity) => ids.includes(entity.id));
  }

  async save(entity: Entity): Promise<number> {
    const clonedEntity = clone(entity);
    this.storage.set(entity.id.toString(), clonedEntity);

    return entity.id;
  }

  async saveAll(entities: Entity[]): Promise<number[]> {
    return Promise.all(entities.map((entity) => this.save(entity)));
  }

  async delete(id: number): Promise<void> {
    this.storage.delete(id.toString());
  }

  async deleteAll(entities: Entity[] = []): Promise<void> {
    return isEmpty(entities) ? this.storage.clear() : void entities.map((entity) => void this.delete(entity.id));
  }
}
