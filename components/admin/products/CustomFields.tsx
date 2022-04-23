import { KeyboardEventHandler, useState } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string): Option => ({
  label,
  value: label,
});

type MultiTextInputProps = {
  className?: string;
  value: string[] | undefined;
  placeholder: string;
  onChange: (value: string[]) => void;
};

export const MultiTextInput = ({
  className,
  value,
  onChange,
  placeholder,
}: MultiTextInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputs, setInputs] = useState<readonly Option[]>(
    value!.map((value) => createOption(value))
  );

  const handleChange = (
    value: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    setInputs(value);
    onChange(value.map((input) => input.value));
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === ",") {
      e.preventDefault();
      setInputValue("");
      setInputs((inputs) => [...inputs, createOption(inputValue)]);
      onChange([...inputs.map((input) => input.value), inputValue]);
    }
  };

  return (
    <CreatableSelect
      className={className}
      menuIsOpen={false}
      isClearable
      isMulti
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={inputs}
      inputValue={inputValue}
      placeholder={placeholder}
      components={{
        DropdownIndicator: null,
      }}
    />
  );
};
