"use client";

import { UIEvent } from "react";

import { toggleTodo } from "@/actions/todos/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";
import { useTodos } from "@/hooks/useTodos";
import { TodoId } from "@/modules/domain/todo";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

type Props = {
  todoId: TodoId;
  completed: boolean;
  disabled: boolean;
};

const { TOGGLE_TODO } = TodoOptimisticActionType;

export const TodoCheckBox = ({ todoId, completed, disabled }: Props) => {
  const { userId, dispatchAction } = useTodos();

  const handleToggleTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: TOGGLE_TODO, payload: { todoId } });
    await toggleTodo({ userId, todoId, completed: !completed });
  };

  return (
    <div className="flex w-[30px] items-center justify-center">
      <Checkbox checked={completed} onClick={handleToggleTodo} disabled={disabled} />
    </div>
  );
};
