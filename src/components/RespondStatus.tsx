import { clsx } from "../utils/clsx";

interface ReposndStatusProps {
  message: string;
  status: string;
}

function RespondStatus({ message, status }: ReposndStatusProps) {
  return (
    <div
      className={clsx(`flex justify-between p-2`, {
        "bg-red-400 text-white": status !== "Success",
        "bg-green-400 text-white": status === "Success",
      })}
    >
      <p>Message: {message}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default RespondStatus;
