export const Spinner = ({ display }: { display: boolean }) => {
  return (
    <div className="mt-2">
      {display && (
        <div className="relative inline-flex" aria-label="Loading spinner">
          <div className="size-6 rounded-full bg-slate-600"></div>
          <div className="absolute left-0 top-0 size-6 animate-ping rounded-full bg-custom-primary"></div>
          <div className="absolute left-0 top-0 size-6 animate-pulse rounded-full bg-custom-secondary"></div>
        </div>
      )}
    </div>
  );
};
