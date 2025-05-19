import type { SelectCategoryProps } from "./SelectBranchCategory";

function SelectDeliveryCategory({
  name,
  onChange,
  value,
}: SelectCategoryProps) {
  return (
    <select
      className="border-2 p-2 rounded"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
    >
      <option value="All">All Delivery Options</option>
      <option value="Delivery">Delivery</option>
      <option value="Non-Delivery">Non-Delivery</option>
    </select>
  );
}

export default SelectDeliveryCategory;
