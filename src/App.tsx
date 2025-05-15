import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { PinCodeData } from "./types/PinCodeData";
import { getPinCodeData, getPostOfficeData } from "./services/getPinCodeData";
import Loading from "./components/Loading";
import SearchComponent from "./components/SearchComponent";
import DisplayPostals from "./components/DisplayPostals";
import type { FilterByBranch, FilterByDelivery } from "./types/FilterTypes";
import SelectBranchCategory from "./components/SelectBranchCategory";
import SelectDeliveryCategory from "./components/SelectDeliveryCategory";

function App() {
  const [isPinCode, setIsPinCode] = useState<boolean>(true);
  const [postalData, setPostalData] = useState<PinCodeData[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<FilterByDelivery>("All");
  const [branchType, setBranchType] = useState<FilterByBranch>("All");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getData() {
      if (!searchInput) return;

      if (isPinCode && !/^\d{6}$/.test(searchInput)) {
        setErrorMessage("Please enter a valid 6-digit pin code.");
        return;
      }

      setIsLoading(true);
      try {
        const data = isPinCode
          ? await getPinCodeData(searchInput)
          : await getPostOfficeData(searchInput);

        setHasSearched(true);

        if (data && data[0].Status !== "Error") {
          setPostalData(data);
          setErrorMessage(null);
        } else {
          setPostalData([]);
          setErrorMessage("No data found");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching data" + error);
        setPostalData([]);
      } finally {
        inputRef.current!.value = "";
        setIsLoading(false);
      }
    }

    getData();
  }, [isPinCode, searchInput]);

  function handleSearchClick() {
    if (inputRef.current) {
      const inputValue = inputRef.current.value.trim();
      setSearchInput(inputValue);
    }
  }

  function handleSelectDelivery(e: ChangeEvent<HTMLSelectElement>) {
    setDeliveryStatus(e.target.value as "Delivery" | "Non-Delivery" | "All");
  }

  function handleSelectBranchType(e: ChangeEvent<HTMLSelectElement>) {
    setBranchType(
      e.target.value as "All" | "Head Post Office" | "Sub Post Office"
    );
  }

  return (
    <>
      <SearchComponent
        inputRef={inputRef}
        onSelectPinCode={() => setIsPinCode(true)}
        onSearchClick={handleSearchClick}
        onSelectPostOffice={() => setIsPinCode(false)}
        isPinCode={isPinCode}
      />

      {!isLoading && !errorMessage && hasSearched ? (
        <>
          <div className="flex gap-4 p-2">
            <SelectDeliveryCategory
              onChange={handleSelectDelivery}
              name="delivery"
              value={deliveryStatus}
            />

            <SelectBranchCategory
              onChange={handleSelectBranchType}
              value={branchType}
              name="branchType"
            />
          </div>
          <DisplayPostals
            deliveryStatus={deliveryStatus}
            branchType={branchType}
            postalData={postalData}
          />
        </>
      ) : (
        <Loading
          errorMessage={hasSearched ? errorMessage : null}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default App;
