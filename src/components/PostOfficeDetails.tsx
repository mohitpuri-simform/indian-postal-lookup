import { clsx } from "../utils/clsx";

interface PostOfficeDetailsProps {
  name: string;
  deliveryStatus: string;
  branchType: string;
}

function PostOfficeDetails({
  name,
  branchType,
  deliveryStatus,
}: PostOfficeDetailsProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <p className="text-blue-800 font-medium text-2xl">{name}</p>
      <div className="flex gap-4">
        <span
          className={clsx({
            "bg-green-400 rounded px-2 py-1 text-xs":
              deliveryStatus === "Delivery",
            "bg-red-400 rounded px-2 py-1 text-xs":
              deliveryStatus !== "Delivery",
          })}
        >
          {deliveryStatus}
        </span>
        <span className="bg-yellow-400 rounded px-2 py-1 text-xs">
          {branchType}
        </span>
      </div>
    </div>
  );
}

export default PostOfficeDetails;
