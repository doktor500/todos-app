import { Optional } from "@/modules/domain/utils/optionalUtils";

export const DB = "db";

export default interface Repository<Entity extends { id: number }> {
  get(id: number): Promise<Optional<Entity>>;
  getAll(ids?: number[]): Promise<Entity[]>;
  save(entity: Entity): Promise<number>;
  saveAll(entities: Entity[]): Promise<number[]>;
  delete(id: number): Promise<void>;
  deleteAll(entities?: Entity[]): Promise<void>;
}
