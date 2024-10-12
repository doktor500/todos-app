import { Viewport } from "next";
import { redirect } from "next/navigation";

import { Todos } from "@/components/Todos";
import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { TodosApplicationProvider } from "@/providers/TodosApplicationProvider";

type Params = { params: { id: UserId } };

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const Page = async ({ params }: Params) => {
  const user = await usersRepository.get(params.id);
  if (!user) return redirect("/");

  return (
    <TodosApplicationProvider user={user}>
      <Todos />
    </TodosApplicationProvider>
  );
};

export default Page;
