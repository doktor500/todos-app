import { TodoEntry } from "@/components/TodoEntry";
import { TodoActionHandler } from "@/hooks/useTodos";
import { Todo } from "@/modules/domain/todo";

type Props = {
  userId: number;
  todos: Todo[];
  todoActionHandler: TodoActionHandler;
};

export const TodoList = ({ userId, todos, todoActionHandler }: Props) => {
  return (
    <div className="h-[68.5vh] overflow-y-scroll">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="pt-1">
            <TodoEntry
              userId={userId}
              todoId={todo.id}
              content={todo.content}
              completed={todo.completed}
              todoActionHandler={todoActionHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
