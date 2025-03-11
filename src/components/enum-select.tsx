import React, { useState, useEffect } from "react";
import { Select } from "./select";

type EnumSelectProps<T extends Record<string, string>> = {
  enumObject: T;
  name?: string;
  className?: string;
  onChange?: (value: T[keyof T]) => void;
  value: T[keyof T];
};

export function EnumSelect<T extends Record<string, string>>({
  enumObject,
  name,
  className,
  onChange,
}: EnumSelectProps<T>) {
  const enumValues = Object.values(enumObject);
  const [selected, setSelected] = useState<T[keyof T]>(
    enumValues[0] as T[keyof T]
  );

  useEffect(() => {
    setSelected(enumValues[0] as T[keyof T]);
  }, [enumObject, enumValues]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as T[keyof T];
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Select
      name={name}
      className={className}
      value={selected}
      onChange={handleChange}
    >
      {enumValues.map((value) => (
        <option key={value} value={value}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </option>
      ))}
    </Select>
  );
}
