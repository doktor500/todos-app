import "core-js/features/promise/with-resolvers";

import ResizeObserver from "resize-observer-polyfill";

vi.stubGlobal("ResizeObserver", ResizeObserver);
window.HTMLElement.prototype.scrollIntoView = vi.fn();
