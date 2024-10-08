import { Optional } from "@/modules/domain/utils/optionalUtils";
import { isLocalEnvironment } from "@/modules/infrastructure/systemUtils.mjs";
import InMemoryRepository from "@/test/utils/repositories/inMemoryRepository";
import { PersistentRepository } from "@/test/utils/repositories/persistentRepository";
import Repository from "@/test/utils/repositories/repository";

export type RepositoryProps = {
  persistent?: boolean;
  name: string;
};

export abstract class FakeRepository<Entity extends { id: number }> implements Repository<Entity> {
  protected readonly repository: Repository<Entity>;

  protected constructor(props: RepositoryProps) {
    const { name } = props;
    const storage = new Map<string, Entity>();
    this.repository = this.isPersistent(props) ? new PersistentRepository(name) : new InMemoryRepository(storage);
  }

  async get(id: number): Promise<Optional<Entity>> {
    return this.repository.get(id);
  }

  async getAll(ids: number[] = []): Promise<Entity[]> {
    return this.repository.getAll(ids);
  }

  async save(entity: Entity): Promise<number> {
    return this.repository.save(entity);
  }

  async saveAll(entities: Entity[]): Promise<number[]> {
    return this.repository.saveAll(entities);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async deleteAll(entities: Entity[] = []): Promise<void> {
    return this.repository.deleteAll(entities);
  }

  protected isPersistent = (props: { persistent?: boolean }): boolean => {
    return props.persistent || isLocalEnvironment();
  };
}
