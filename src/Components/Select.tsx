import {
  SelectLabel,
  SelectOption,
  SelectPlaceholder,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectRootProps,
} from "@cyhfe/react-ui";
import * as React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectRootProps {
  options: Option[];
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(
  props: SelectProps,
  forwardRef
) {
  const { options, ...rest } = props;
  return (
    <div>
      <SelectRoot ref={forwardRef} {...rest}>
        <SelectTrigger className="w-40 min-h-[30px] px-3 py-2 text-left shadow-sm hover:shadow-md  bg-white rounded-lg">
          <SelectPlaceholder className="text-slate-500" />
          <SelectLabel />
        </SelectTrigger>

        <SelectPopup
          keepMounted
          className="flex flex-col gap-y-1 p-2 w-40 min-h-[30px] max-h-[200px] overflow-auto border rounded-lg shadow-lg bg-white"
        >
          {options.map((option) => {
            return (
              <SelectOption
                key={option.value}
                value={option.value}
                className="text-left hover:bg-slate-100 px-3 py-2  data-[selected=true]:bg-sky-100 data-[selected=true]:text-sky-900 rounded-lg  "
              >
                {option.label}
              </SelectOption>
            );
          })}
        </SelectPopup>
      </SelectRoot>
    </div>
  );
});

export { Select };
