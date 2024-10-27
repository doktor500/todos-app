import { Viewport } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/core/todos/todos";
import { TodosApplicationProvider } from "@/providers/todosApplicationProvider";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const Page = async () => {
  const user = await getUser();
  if (!user) return redirect("/");

  return (
    <TodosApplicationProvider user={user}>
      <Todos />
    </TodosApplicationProvider>
  );
};

export default Page;
