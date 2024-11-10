import { Button } from "@/components/ui/button";

export const FormActionButton = ({ isLoading, value }: { isLoading: boolean; value: string }) => {
  return (
    <Button type="submit" className="w-full font-bold" disabled={isLoading}>
      {value}
    </Button>
  );
};
