import { Viewport } from "next";
import { redirect } from "next/navigation";

import { Todos } from "@/components/Todos";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { TodosProvider } from "@/providers/TodosProvider";

type Params = { params: { id: number } };

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
    <>
      <h1 className="pt-4 text-center text-2xl font-bold">Inbox</h1>
      <TodosProvider user={user}>
        <Todos />
      </TodosProvider>
    </>
  );
};

export default Page;
