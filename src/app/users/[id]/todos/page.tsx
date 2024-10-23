import { redirect } from "next/navigation";

import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/Todos";
import { UserId } from "@/modules/domain/user";
import { TodosApplicationProvider } from "@/providers/TodosApplicationProvider";

type Props = { params: Promise<{ id: UserId }> };

const Page = async (props: Props) => {
  const params = await props.params;
  const user = await getUser(params.id);
  if (!user) return redirect("/");

  return (
    <TodosApplicationProvider user={user}>
      <Todos />
    </TodosApplicationProvider>
  );
};

export default Page;
