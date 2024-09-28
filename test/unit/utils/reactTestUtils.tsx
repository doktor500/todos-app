import { act, render } from "@testing-library/react";
import React from "react";

type Component<PROPS> = (props: PROPS) => Promise<React.ReactNode | undefined | null>;

// Temporary solution for async rendering until https://github.com/testing-library/react-testing-library/issues/1209 is resolved
export const renderAsync = async <PROPS extends object>(component: Component<PROPS>, props?: PROPS) => {
  const RenderedComponent = await renderComponent(component, props);

  return act(() => render(<RenderedComponent />));
};

const renderComponent = async <PROPS extends object>(component: Component<PROPS>, props = {}) => {
  const RenderedComponent = await component(props as PROPS);

  return (): React.ReactNode => RenderedComponent as React.ReactNode;
};
