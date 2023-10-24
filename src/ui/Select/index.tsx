import { Label } from "@sandercamp/ui-components";
import Select, { Props as SelectProps } from "react-select";

interface SelectWrapperProps<OptionType, IsMulti extends boolean = false>
  extends SelectProps<OptionType, IsMulti> {
  label: string;
}

const SelectWrapper = <OptionType, IsMulti extends boolean = false>(
  props: SelectWrapperProps<OptionType, IsMulti>,
) => {
  if (props.label) {
    return (
      <Label>
        {props.label}
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
  }

  return (
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
  );
};

export default SelectWrapper;
