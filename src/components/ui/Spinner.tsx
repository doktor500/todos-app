export const Spinner = ({ display }: { display: boolean }) => {
  return (
    <div className="flex items-center justify-center pt-4">
      {display && (
        <div className="relative inline-flex" aria-label="Loading spinner">
          <div className="size-4 rounded-full bg-slate-200"></div>
          <div className="absolute left-0 top-0 size-4 animate-ping rounded-full bg-slate-200"></div>
          <div className="absolute left-0 top-0 size-4 animate-pulse rounded-full bg-slate-200"></div>
        </div>
      )}
    </div>
  );
};
