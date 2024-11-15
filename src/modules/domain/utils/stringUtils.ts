import { isEmpty } from "ramda";

export const MAX_LENGTH = 255 as const;
export const MAX_PASSWORD_LENGTH = 72 as const;

const isNotEmpty = (item: string) => !isEmpty(item);

export { isNotEmpty };
