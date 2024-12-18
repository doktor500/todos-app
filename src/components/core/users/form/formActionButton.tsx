import { Button } from "@/components/ui/button";

export const FormActionButton = ({ isLoading, value }: { isLoading: boolean; value: string }) => {
  return (
    <Button
      type="submit"
      className="group relative mb-2 me-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-custom-primary to-custom-secondary p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
      disabled={isLoading}
    >
      <span className="relative w-full rounded-md bg-white px-5 py-1.5 transition-all duration-75 ease-in group-hover:opacity-90 dark:bg-gray-900">
        {value}
      </span>
    </Button>
  );
};
