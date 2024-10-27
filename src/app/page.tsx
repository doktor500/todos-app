import { redirect } from "next/navigation";

import { TODOS_ROUTE } from "@/routes";

const Page = () => {
  redirect(TODOS_ROUTE);
};

export default Page;
