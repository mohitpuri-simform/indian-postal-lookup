import type { PinCodeData } from "../types/PinCodeData";

interface DisplayPostalsProps {
  postalData: PinCodeData[];
  deliveryStatus: "Delivery" | "Non-Delivery" | "All";
  branchType: "All" | "Head Post Office" | "Sub Post Office";
}

function DisplayPostals({
  postalData,
  deliveryStatus,
  branchType,
}: DisplayPostalsProps) {
  const filteredPostOffices = postalData[0]?.PostOffice?.filter(
    (postOfficeItem) => {
      const deliveryMatch =
        deliveryStatus === "All" ||
        postOfficeItem.DeliveryStatus === deliveryStatus;

      const branchTypeMatch =
        branchType === "All" || postOfficeItem.BranchType === branchType;

      return deliveryMatch && branchTypeMatch;
    }
  );

  if (!filteredPostOffices || filteredPostOffices.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No post offices found matching your criteria
      </div>
    );
  }

  return (
    <>
      <div>
        <div
          className={`flex justify-between ${
            postalData[0]?.Status !== "Success"
              ? "bg-red-400 text-white"
              : "bg-green-400 text-white"
          } p-2`}
        >
          <p>Message: {postalData[0]?.Message}</p>
          <p>Status: {postalData[0]?.Status}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 m-2">
        {filteredPostOffices.map((office) => (
          <div key={office.Name} className="bg-blue-200 p-2 rounded">
            <div className="flex justify-between items-center">
              <p className="text-blue-800 font-medium">{office.Name}</p>
              <div className="flex gap-2">
                <span
                  className={
                    office.DeliveryStatus === "Delivery"
                      ? "bg-green-400 rounded px-2 py-1 text-xs"
                      : "bg-red-400 rounded px-2 py-1 text-xs"
                  }
                >
                  {office.DeliveryStatus}
                </span>
                <span className="bg-yellow-400 rounded px-2 py-1 text-xs">
                  {office.BranchType}
                </span>
              </div>
            </div>
            <div className="mt-2 rounded bg-gray-50 p-2">
              <p>
                <span className="font-semibold">District:</span>{" "}
                {office.District}
              </p>
              <p>
                <span className="font-semibold">Division:</span>{" "}
                {office.Division}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {office.Region}
              </p>

              <p>
                <span className="font-semibold">Country:</span> {office.Country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayPostals;
