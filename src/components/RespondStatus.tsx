import { clsx } from "../utils/clsx";

interface ReposndStatusProps {
  message: string;
  status: string;
}

function RespondStatus({ message, status }: ReposndStatusProps) {
  return (
    <div
      className={clsx(
        `flex justify-between p-2`,
        status !== "Success"
          ? "bg-red-400 text-white"
          : "bg-green-400 text-white"
      )}
    >
      <p>Message: {message}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default RespondStatus;
