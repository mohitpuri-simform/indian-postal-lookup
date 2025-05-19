import type { ChangeEvent } from "react";

export interface SelectCategoryProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
}
function SelectBranchCategory({ onChange, value, name }: SelectCategoryProps) {
  return (
    <select
      className="border-2 p-2 rounded"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
    >
      <option value="All">All Branch Types</option>
      <option value="Head Post Office">Head Post Office</option>
      <option value="Sub Post Office">Sub Post Office</option>
    </select>
  );
}

export default SelectBranchCategory;
