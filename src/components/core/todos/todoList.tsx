"use client";

import SortableList, { SortableItem } from "@reyhappen/react-easy-sort";
import { useState } from "react";

import { sortTodos } from "@/actions/todos/sortTodos";
import { TodoEntry } from "@/components/core/todos/todoEntry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAtomicAnimations } from "@/hooks/common/useAutomaticAnimations";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { Todo, toTodoEntry } from "@/modules/domain/todo";
import { moveItemIn } from "@/modules/domain/utils/collectionUtils";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { SORT_TODOS } = TodoOptimisticActionType;

export const TodoList = () => {
  const { filteredTodos, allTodos, dispatchAction, pendingTransaction } = useTodos();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [animationsContainerRef, setEnableAnimations] = useAtomicAnimations();
  const allowDrag = !pendingTransaction;

  const handleSortEnd = async (oldIndex: number, newIndex: number) => {
    setIsGrabbed(false);
    document.getSelection()?.empty();
    await updateTodosSorting(oldIndex, newIndex);
    setEnableAnimations(true);
  };

  const updateTodosSorting = async (oldIndex: number, newIndex: number) => {
    const sourceTodoId = filteredTodos.at(oldIndex)?.id;
    const destinationTodoId = filteredTodos.at(newIndex)?.id;
    const previousIndex = allTodos.findIndex((todo) => todo.id === sourceTodoId);
    const nextIndex = allTodos.findIndex((todo) => todo.id === destinationTodoId);
    const sortedTodos = updateTodosIndex(previousIndex, nextIndex, allTodos);
    const updatedTodos = getChangedTodos(previousIndex, nextIndex, sortedTodos);

    dispatchAction({ type: SORT_TODOS, payload: { todos: sortedTodos } });
    await sortTodos({ todos: updatedTodos });
  };

  const updateTodosIndex = (previousIndex: number, nextIndex: number, todos: Todo[]) => {
    return moveItemIn(todos)
      .from(previousIndex)
      .to(nextIndex)
      .map((todo, index) => ({ ...todo, index: todos.length - index }));
  };

  const getChangedTodos = (previousIndex: number, nextIndex: number, todos: Todo[]) => {
    const start = Math.min(previousIndex, nextIndex);
    const end = start + Math.max(previousIndex, nextIndex) + 1;

    return todos.slice(start, end).map(toTodoEntry);
  };

  return (
    <ScrollArea className="mt-6 h-[calc(100vh-292px)] w-[calc(100%+1rem)] rounded-md">
      <SortableList
        allowDrag={allowDrag}
        className={cn("pr-4", {
          "cursor-grabbing selection:text-white": allowDrag && isGrabbed,
          "cursor-grab": allowDrag && !isGrabbed,
        })}
        onTransitionStart={() => setEnableAnimations(false)}
        onSortEnd={handleSortEnd}
      >
        <div ref={animationsContainerRef}>
          {filteredTodos.map(({ id, content, completed, stale }) => (
            <SortableItem key={id}>
              <div className="cursor-default [&:not(:first-child)]:pt-1">
                <TodoEntry
                  todoId={id}
                  content={content}
                  completed={completed}
                  stale={Boolean(stale)}
                  allowDrag={allowDrag}
                  isGrabbed={isGrabbed}
                  setIsGrabbed={setIsGrabbed}
                />
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableList>
    </ScrollArea>
  );
};
