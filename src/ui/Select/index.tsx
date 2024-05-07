import { Label } from "@kabisa/ui-components";
import Select, { Props as SelectProps } from "react-select";
import CreatableSelect from "react-select/creatable";

interface SelectWrapperProps<OptionType, IsMulti extends boolean = false>
  extends SelectProps<OptionType, IsMulti> {
  label: string;
  creatable?: boolean;
}

const SelectWrapper = <OptionType, IsMulti extends boolean = false>({
  label,
  creatable = false,
  ...props
}: SelectWrapperProps<OptionType, IsMulti>) => {
  if (creatable) {
    return (
      <Label>
        {label}
        <CreatableSelect<OptionType, IsMulti>
          {...props}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "var(--kabisa-green-100)",
              primary: "var(--kabisa-green)",
            },
          })}
        />
      </Label>
    );
  }

  return (
    <Label>
      {label}
      <Select<OptionType, IsMulti>
        {...props}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "var(--kabisa-green-100)",
            primary: "var(--kabisa-green)",
          },
        })}
      />
    </Label>
  );
};

export type { ActionMeta, OnChangeValue, SingleValue } from "react-select";
export default SelectWrapper;
