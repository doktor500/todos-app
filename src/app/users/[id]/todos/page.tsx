import { redirect } from "next/navigation";

import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/Todos";
import { UserId } from "@/modules/domain/user";
import { TodosApplicationProvider } from "@/providers/TodosApplicationProvider";

type Props = { params: Promise<{ id: UserId }> };

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
