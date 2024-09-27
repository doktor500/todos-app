export type UpdateTodo = {
  todoId: number;
  completed: boolean;
};

interface TodosRepository {
  update({ todoId, completed }: UpdateTodo): Promise<void>;
  delete(todoId: number): Promise<void>;
}

export default TodosRepository;
