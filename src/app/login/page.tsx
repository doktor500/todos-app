import { LoginForm } from "@/react-components/core/users/loginForm";

const Page = () => {
  return (
    <div className="container mx-auto max-w-2xl items-center justify-center px-4 pb-10">
      <div className="sticky top-0 z-50 bg-slate-900 pb-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
