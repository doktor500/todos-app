export const AppTitle = ({ title }: { title?: string }) => {
  return (
    title && (
      <h1 className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text pl-4 pt-2 text-center font-sans text-2xl font-bold text-transparent">
        {title}
      </h1>
    )
  );
};
