"use client";

import { FocusEvent, KeyboardEvent } from "react";

import { editTodo } from "@/actions/todos/editTodo";
import { useInput } from "@/hooks/common/useInput";
import { useTodos } from "@/hooks/useTodos";
import { TodoId } from "@/modules/domain/todo";
import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

type Props = {
  todoId: TodoId;
  content: string;
  disabled: boolean;
};

const { EDIT_TODO } = TodoOptimisticActionType;

export const TodoInput = ({ todoId, content, disabled }: Props) => {
  const { dispatchAction } = useTodos();
  const input = useInput();

  const handleEditTodo = async (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (content !== event.target.value) {
      dispatchAction({ type: EDIT_TODO, payload: { todoId, content: event.target.value } });
      await editTodo({ todoId, content: event.target.value });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      input.blur();
    }
  };

  return (
    <div className="w-full">
      <label className="hidden" htmlFor={`todo-${todoId}`} aria-label="todo">
        {content}
      </label>
      <input
        ref={input.inputRef}
        aria-label={`Edit todo ${content}`}
        id={`todo-${todoId}`}
        maxLength={MAX_LENGTH}
        className="w-full truncate bg-transparent px-2 text-sm outline-none disabled:cursor-wait"
        defaultValue={content}
        onBlur={handleEditTodo}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
};
