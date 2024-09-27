import { TodoCheckbox } from "@/components/app/TodoCheckbox";
import { Todo } from "@/modules/domain/todo";

type Props = {
  userId: number;
  todos: Todo[];
};

export const TodoList = ({ userId, todos }: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="pt-1">
          <TodoCheckbox
            userId={userId}
            todoId={todo.id}
            content={todo.content}
            completed={todo.completed}
          />
        </li>
      ))}
    </ul>
  );
};
