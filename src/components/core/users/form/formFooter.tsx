import Link from "next/link";

import { Route } from "@/router/appRouter";

export const FormFooter = ({ title, link, value }: { title: string; link: Route; value: string }) => {
  return (
    <p className="w-full text-center text-sm">
      {title}
      <Link href={link} className="pl-2 text-primary hover:underline">
        {value}
      </Link>
    </p>
  );
};
