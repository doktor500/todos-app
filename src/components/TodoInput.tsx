"use client";

import { FocusEvent, KeyboardEvent } from "react";

import { editTodo } from "@/actions/editTodo";
import { useInput } from "@/hooks/common/useInput";
import { useTodos } from "@/hooks/useTodos";
import { MAX_LENGTH } from "@/modules/domain/stringUtils";
import { TodoId } from "@/modules/domain/todo";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

type Props = {
  todoId: TodoId;
  content: string;
  disabled: boolean;
};

const { EDIT_TODO } = TodoOptimisticActionType;

export const TodoInput = ({ todoId, content, disabled }: Props) => {
  const { userId, dispatchAction } = useTodos();
  const input = useInput();

  const handleEditTodo = async (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (content !== event.target.value) {
      dispatchAction({ type: EDIT_TODO, payload: { todoId, content: event.target.value } });
      await editTodo({ userId, todoId, content: event.target.value });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      input.blur();
    }
  };

  return (
    <div className="flex w-[233px] items-center md:w-[570px]">
      <label className="hidden" htmlFor={`todo-${todoId}`}>
        {content}
      </label>
      <input
        ref={input.inputRef}
        id={`todo-${todoId}`}
        maxLength={MAX_LENGTH}
        className="w-[233px] truncate bg-transparent px-2 text-sm outline-none disabled:cursor-wait md:w-[515px]"
        defaultValue={content}
        onBlur={handleEditTodo}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
};