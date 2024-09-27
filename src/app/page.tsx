import { redirect } from 'next/navigation'

const Page = () => {
  redirect("users/1/todos");
};

export default Page;
