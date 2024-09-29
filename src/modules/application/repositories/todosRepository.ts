import { ExistingTodo } from "@/modules/domain/todo";

interface TodosRepository {
  update(todo: ExistingTodo): Promise<void>;
  delete(todoId: number): Promise<void>;
}

export default TodosRepository;
