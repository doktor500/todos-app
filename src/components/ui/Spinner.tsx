export const Spinner = ({ display }: { display: boolean }) => {
  return (
    <div className="flex h-12 items-center justify-center">
      {display && (
        <div className="relative inline-flex">
          <div className="size-4 rounded-full bg-blue-200"></div>
          <div className="absolute left-0 top-0 size-4 animate-ping rounded-full bg-blue-200"></div>
          <div className="absolute left-0 top-0 size-4 animate-pulse rounded-full bg-blue-200"></div>
        </div>
      )}
    </div>
  );
};
