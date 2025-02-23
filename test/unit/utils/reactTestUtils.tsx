import { act, render } from "@testing-library/react";
import { JSX } from "react";

// Follow <https://github.com/testing-library/react-testing-library/issues/1209>
export const renderAsync = async (node: JSX.Element) => {
  await act(async () => render(await getNearestClientComponent(node)));
};

const getNearestClientComponent = async (node: JSX.Element) => {
  if (!isAsyncFunction(node.type)) return node;
  const nodeReturnValue = await node.type({ ...node.props });

  return getNearestClientComponent(nodeReturnValue);
};

const isAsyncFunction = (value: unknown): boolean => Object.prototype.toString.call(value) === "[object AsyncFunction]";
