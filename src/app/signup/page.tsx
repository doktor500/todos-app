import { AppHeader } from "@/components/core/app/appHeader";
import { SignUpForm } from "@/components/core/users/signupForm";

const Page = () => {
  return (
    <div className="container mx-auto max-w-2xl items-center justify-center px-4 pb-10">
      <div className="sticky top-0 z-50 bg-slate-900 pb-6 shadow-md">
        <AppHeader />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
