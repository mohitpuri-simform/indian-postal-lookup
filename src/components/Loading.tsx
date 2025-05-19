interface LoadingProps {
  errorMessage: string | null;
  isLoading: boolean;
}

function Loading({ errorMessage, isLoading }: LoadingProps) {
  if (isLoading) return <div className="text-center">Loading...</div>;
  return (
    <div className="text-center flex justify-center items-center">
      {errorMessage ??
        "Search for a pin code (e.g., 364001) or post office name (e.g, new delhi)"}
    </div>
  );
}

export default Loading;
