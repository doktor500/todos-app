import { revalidatePath } from "next/cache";

export const webCache = {
    revalidatePath: (path: string) => revalidatePath(path)
};