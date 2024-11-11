import "core-js/features/promise/with-resolvers";

import * as matchers from "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { expect } from "vitest";

process.env.SKIP_ENV_VALIDATION = "true";

vi.mock("server-only", () => ({}));
vi.stubGlobal("ResizeObserver", ResizeObserver);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

expect.extend(matchers);
