import React from "react";

export interface ValueGroup {
  value: string;
  usageCount: number;
}

export const MultiSelectorDataList = ({
  id,
  items,
}: {
  id: string;
  items: ValueGroup[] | null;
}) => {
  return (
    <datalist id={id}>
      {items &&
        items.map(({ value, usageCount }) => (
          <option value={value} key={value}>
            {value} ({usageCount})
          </option>
        ))}
    </datalist>
  );
};
