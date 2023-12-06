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
      <div>
        <SelectRoot ref={forwardRef} {...rest} className="font-semibold">
          <SelectTrigger className="flex justify-between items-center gap-x-2  p-1">
            <div>
              <SelectPlaceholder className="text-slate-500" />
              <SelectLabel />
            </div>
            <FaAngleDown />
          </SelectTrigger>

          <SelectPopup
            placement="top"
            keepMounted
            className="flex flex-col gap-y-1 w-40 min-h-[30px] max-h-[200px] overflow-auto no-scrollbar shadow-md bg-white"
          >
            {options.map((option) => {
              return (
                <SelectOption
                  key={option.value}
                  value={option.value}
                  className="text-left  hover:bg-slate-200 px-3 py-2  data-[selected=true]:bg-slate-100"
                >
                  {option.label}
                </SelectOption>
              );
            })}
          </SelectPopup>
        </SelectRoot>
      </div>
    );
  }
);

export { WebsitesSelect };
