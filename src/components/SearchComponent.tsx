import type { Ref } from "react";
import Button from "./Button";

interface SearchComponentProps {
  isActive: boolean;
  isPinCode: boolean;
  fn: () => void;
  fn2: () => void;
  fn3: () => void;
  inputRef: Ref<HTMLInputElement>;
}

function SearchComponent({
  fn,
  fn2,
  fn3,
  isPinCode,
  inputRef,
}: SearchComponentProps) {
  return (
    <div className="m-2">
      <div className="flex gap-2 my-2">
        <Button isActive={isPinCode} onClick={fn}>
          Search by Pin Code
        </Button>
        <Button isActive={!isPinCode} onClick={fn3}>
          Search by Post Office
        </Button>
      </div>
      <div>
        <input
          type="text"
          ref={inputRef}
          placeholder={
            isPinCode ? "Search by pin code" : "Search by post Office"
          }
          className="border-2 border-black rounded"
        />
        <Button onClick={fn2} isActive={true}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
