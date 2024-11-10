"use server";

import authService from "@/modules/domain/shared/authService";

export const logoutUser = async (): Promise<void> => {
  await authService.deleteSession();
};
