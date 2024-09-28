import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/createTodo";
import { useForm } from "@/hooks/common/useForm";
import { TodoActionHandler } from "@/hooks/useTodos";
import { TodoAction, TodoActionType } from "@/modules/domain/todo";

type Props = {
  userId: number;
  todoActionHandler: TodoActionHandler;
  pendingTransaction: boolean;
};

const { CREATE_TODO } = TodoActionType;

export const CreateTodoForm = (props: Props) => {
  const { userId, todoActionHandler, pendingTransaction } = props;
  const { formRef, resetForm } = useForm();

  const handleCreateTodo = async (formData: FormData) => {
    const content = formData.get("todo")?.toString();
    if (content && !pendingTransaction) {
      const action: TodoAction = { type: CREATE_TODO, payload: { content } };
      todoActionHandler.handle(action);
      resetForm();

      await createTodo(formData);
    }
  };

  return (
    <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/30">
      <div className="flex items-center text-gray-800 dark:text-white">
        <PlusIcon size="20" />
        <form ref={formRef} action={handleCreateTodo} aria-label="Create todo">
          <input type="hidden" name="userId" value={userId} />
          <input
            type="text"
            name="todo"
            aria-label="New todo"
            placeholder="Add a to-do..."
            className="w-80 border-none bg-transparent pl-1 text-sm outline-none"
          />
        </form>
      </div>
    </div>
  );
};
