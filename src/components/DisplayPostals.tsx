import type { FilterByBranch, FilterByDelivery } from "../types/FilterTypes";
import type { PinCodeData } from "../types/PinCodeData";
import InfoParagraph from "./InfoParagraph";
import PostOfficeDetails from "./PostOfficeDetails";
import RespondStatus from "./RespondStatus";

interface DisplayPostalsProps {
  postalData: PinCodeData[];
  deliveryStatus: FilterByDelivery;
  branchType: FilterByBranch;
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

  if (filteredPostOffices.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No post offices found matching your criteria
      </div>
    );
  }

  return (
    <>
      <div>
        <RespondStatus
          message={postalData[0].Message}
          status={postalData[0].Status}
        />
      </div>
      <div className="flex flex-col gap-6 m-2 ">
        {filteredPostOffices.map((filteredPostOfficeItem) => (
          <div
            key={filteredPostOfficeItem.Name}
            className="bg-blue-200 p-2 rounded "
          >
            <PostOfficeDetails
              branchType={filteredPostOfficeItem.BranchType}
              deliveryStatus={filteredPostOfficeItem.BranchType}
              name={filteredPostOfficeItem.Name}
            />

            <div className="mt-2 rounded bg-gray-50 p-2">
              <InfoParagraph
                label="District"
                category={filteredPostOfficeItem.District}
              />
              <InfoParagraph
                label="Division"
                category={filteredPostOfficeItem.Division}
              />
              <InfoParagraph
                label="Region"
                category={filteredPostOfficeItem.Region}
              />
              <InfoParagraph
                label="Country"
                category={filteredPostOfficeItem.Country}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayPostals;
