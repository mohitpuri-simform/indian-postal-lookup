interface LoadingProps {
  errorMessage: string | null;
}
function Loading({ errorMessage }: LoadingProps) {
  return <div>{errorMessage ? "No Data Found " : "Loading"} </div>;
}

export default Loading;
