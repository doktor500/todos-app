import "core-js/features/promise/with-resolvers";

import ResizeObserver from "resize-observer-polyfill";

process.env.SKIP_ENV_VALIDATION = "true";

vi.stubGlobal("ResizeObserver", ResizeObserver);
window.HTMLElement.prototype.scrollIntoView = vi.fn();
