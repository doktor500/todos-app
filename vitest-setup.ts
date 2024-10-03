import * as matchers from "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { expect } from "vitest";

vi.stubGlobal("ResizeObserver", ResizeObserver);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

expect.extend(matchers);
