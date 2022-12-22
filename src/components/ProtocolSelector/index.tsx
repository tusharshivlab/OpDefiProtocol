import React from "react";
import { Chain, DEFI_LLAMA_LIST } from "@/constants";
import { useEffect, useState } from "react";
import NcDropDown from "../NcDropDown/NcDropDown";
import { DropDownIcon } from "../Logos";

interface ProtocolSelectorParams {
  filter?: string[];
  chain?: Chain;
  onChange?: (e: any) => void;
  selected?: any;
  protocolList?:any,
}

const ProtocolSelector = ({
  chain = "ethereum",
  filter,
  onChange,
  selected,
  protocolList,
}: ProtocolSelectorParams) => {
  const [protocolOptions, setProtocolOptions] = useState();
  
  useEffect(() => {
    (async () => {
      const response = await fetch(DEFI_LLAMA_LIST);
      const data = await response.json();

      const options = data
        .filter(
          (t: { chains: string[]; name: string; address: string }) =>
            t.chains.includes(
              (chain as string).charAt(0).toUpperCase() +
                (chain as string).slice(1)
            ) &&
            (!filter || filter.includes(t.address))
        )
        .map((t: { chains: string[]; name: string; address: string }) => ({
          label: t.name,
          value: t.address,
        }));
      setProtocolOptions(options);
    })();
  }, [chain, filter]);

  return (
    <>
      <NcDropDown
        className="w-full py-2 px-2 flex rounded-2xl bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
        iconClass="w-4 h-4 sm:h-5 sm:w-5"
        data={protocolList}
        panelMenusClass="origin-top-right !w-52 sm:!w-52"
        onClick={onChange}
        renderTrigger={() => (
          <div className="menu-item menu-dropdown relative flex">
            <img
              src={selected?.icon ?? selected?.icon}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-neutral-900  dark:text-white ml-1 font-medium">
              {selected?.name ?? selected?.name}
            </span>
            <DropDownIcon />
          </div>
        )}
        renderItem={(item: any) => (
          <div
            className={
              "flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate cursor-pointer"
            }>
            <img
              src={item?.icon}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-neutral-900 dark:text-white ml-1 font-medium">
              {item?.name}
            </span>
          </div>
        )}
      />
    </>
  );
};

export default ProtocolSelector;
