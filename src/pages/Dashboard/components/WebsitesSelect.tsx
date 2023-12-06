import {
  SelectLabel,
  SelectOption,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectRootProps,
} from "@cyhfe/react-ui";
import * as React from "react";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectRootProps {
  options: Option[];
}

const WebsitesSelect = React.forwardRef<HTMLDivElement, SelectProps>(
  function Select(props: SelectProps, forwardRef) {
    const { options, ...rest } = props;
    return (
      <SelectRoot ref={forwardRef} {...rest} className="font-semibold">
        <SelectTrigger className="flex min-w-[90px] items-center justify-between gap-x-2 text-left">
          <SelectLabel />
          <FaAngleDown />
        </SelectTrigger>

        <SelectPopup
          placement="bottom-start"
          keepMounted
          className="flex max-h-[200px] min-w-[120px] flex-col overflow-auto  rounded bg-white shadow-lg"
        >
          {options.map((option) => {
            return (
              <SelectOption
                key={option.value}
                value={option.value}
                className="px-3 py-2 text-left text-slate-500 hover:!bg-slate-200 data-[selected=true]:bg-slate-100  data-[selected=true]:font-medium  data-[selected=true]:text-slate-800"
              >
                {option.label}
              </SelectOption>
            );
          })}
        </SelectPopup>
      </SelectRoot>
    );
  },
);

export { WebsitesSelect };
