import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { PinCodeData } from "./types/PinCodeData";
import { getPinCodeData } from "./services/getPinCodeData";
import Loading from "./components/Loading";
import SearchComponent from "./components/SearchComponent";
import DisplayPostals from "./components/ DisplayPostals";

function App() {
  const [isPinCode, setIsPinCode] = useState<boolean>(true);
  const [postalData, setPostalData] = useState<PinCodeData[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<
    "Delivery" | "Non-Delivery" | "All"
  >("All");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      if (!searchInput) return;
      const data = await getPinCodeData(searchInput);
      if (data && data[0].Status !== "Error") {
        setPostalData(data);
        setErrorMessage(null);
      } else {
        setErrorMessage("No data found");
      }
      setIsLoading(false);
    }
    getData();
  }, [searchInput]);

  function handleSearchChange() {
    setSearchInput(inputRef.current!.value);
  }

  function onSelectDelivery(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.selectedIndex) {
      case 0:
        setDeliveryStatus("All");

        break;
      case 1:
        setDeliveryStatus("Delivery");
        break;
      case 2:
        setDeliveryStatus("Non-Delivery");
        break;

      default:
        break;
    }
    console.log(deliveryStatus);
  }

  return (
    <>
      <SearchComponent
        inputRef={inputRef}
        fn={() => setIsPinCode(true)}
        fn3={() => setIsPinCode(false)}
        fn2={handleSearchChange}
        isActive={isPinCode}
        isPinCode={isPinCode}
      />

      {!isLoading && !errorMessage ? (
        <>
          <div>
            <select
              className="border-2"
              name="delivery"
              id="delivery"
              onChange={onSelectDelivery}
            >
              <option value="">Delivery option</option>
              <option value="Delivery">Delivery</option>
              <option value="Non-Delivery">Non-Delivery</option>
            </select>
          </div>
          <DisplayPostals
            deliveryStatus={deliveryStatus}
            postalData={postalData}
          />
        </>
      ) : (
        <Loading errorMessage={errorMessage} />
      )}
    </>
  );
}

export default App;
