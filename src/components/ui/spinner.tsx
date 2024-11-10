export const Spinner = ({ display }: { display: boolean }) => {
  return (
    <div className="mt-2">
      {display && (
        <div className="absolute inline-flex" aria-label="Loading spinner">
          <div className="absolute left-0 top-0 size-6 rounded-sm bg-slate-800/40"></div>
          <div className="absolute left-0 top-0 size-6 animate-ping rounded-sm bg-custom-primary/40"></div>
          <div className="absolute left-0 top-0 size-6 animate-pulse rounded-sm bg-custom-secondary/40"></div>
        </div>
      )}
    </div>
  );
};
