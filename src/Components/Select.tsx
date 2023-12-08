import {
  SelectLabel,
  SelectOption,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectRootProps,
} from "@cyhfe/react-ui";
import * as React from "react";
import { HiOutlineSelector } from "react-icons/hi";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectRootProps {
  options: Option[];
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(
  props: SelectProps,
  forwardRef,
) {
  const { options, ...rest } = props;
  return (
    <SelectRoot ref={forwardRef} {...rest}>
      <SelectTrigger className="flex w-28 items-center justify-between rounded border  border-slate-300 bg-white px-2 py-1 text-sm  text-slate-800 shadow hover:border-slate-500">
        <SelectLabel />
        <HiOutlineSelector className="text-slate-500" />
      </SelectTrigger>

      <SelectPopup
        keepMounted
        className="flex w-28 flex-col rounded border  border-slate-200 bg-white p-2 text-sm shadow hover:border-slate-400"
      >
        {options.map((option) => {
          return (
            <SelectOption
              key={option.value}
              value={option.value}
              className="rounded border-l-4 border-transparent px-2 py-1 text-left text-slate-400 hover:bg-slate-100 hover:text-slate-800 data-[selected=true]:border-indigo-500 data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-800"
            >
              {option.label}
            </SelectOption>
          );
        })}
      </SelectPopup>
    </SelectRoot>
  );
});

export { Select };
