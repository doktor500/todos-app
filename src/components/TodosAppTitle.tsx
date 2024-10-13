import Image from "next/image";

export const TodosAppTitlte = () => {
  return (
    <div className="flex items-center justify-center gap-3 pt-4">
      <Image src="/images/logo.png" alt="logo" width="24" height="24" />
      <h1 className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-center text-2xl font-bold text-transparent">
        Inbox
      </h1>
    </div>
  );
};
