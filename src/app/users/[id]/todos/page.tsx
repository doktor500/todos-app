import { Viewport } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/core/todos/Todos";
import { UserId } from "@/modules/domain/user";
import { TodosApplicationProvider } from "@/providers/TodosApplicationProvider";

type Props = { params: Promise<{ id: UserId }> };

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const Page = async (props: Props) => {
  const user = await props.params.then(({ id }) => getUser(id));
  if (!user) return redirect("/");

  return (
    <TodosApplicationProvider user={user}>
      <Todos />
    </TodosApplicationProvider>
  );
};

export default Page;
