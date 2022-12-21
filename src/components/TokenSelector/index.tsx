import {
  Chain,
  ChainId,
  _1INCH_LIST,
} from "@/constants";
import { useEffect,  useState } from "react";
import React from "react";
import useTokenStore from "@/store/tokens";
import { DropDownIcon } from "../Logos";
import NcDropDown from "../NcDropDown/NcDropDown";

interface TokenSelectorParams {
  filter?: string[];
  chain?: Chain;
  
  inputOnChange?: (e: any) => void;
  inputValue?: string;
}

type Token = {
  label: string;
  value: string;
  logo:string;
};

const TokenSelector = ({
  filter,
  chain = "ethereum",
 
  inputValue,
  inputOnChange,
}: TokenSelectorParams) => {
  const [tokenOptions, setTokenOptions] = useState<any>();
  const chainIdMap = useTokenStore((state) => state.chainIdMap);
  console.log('chainIdMap', chainIdMap)
  useEffect(() => {
    const chainId: number = ChainId[chain as keyof typeof ChainId];
    
    const data = chainIdMap[chainId]?.filter(
      (t: any) =>
        !filter ||
        filter.includes(t.address.toLowerCase()) ||
        filter.includes(t.address)
    );
    const options = data?.map((t: any) => ({
      label: t.symbol,
      value: t.address,
      logo: t.logoURI,
    }));
    setTokenOptions(options);
  }, [chain, filter]);
  const handleMenuClick = async (e: any) => {
    console.log('e', e)
    
  };
  return (
    <div className="flex ">
      <div className="relative mt-1  shadow-sm">
        {inputOnChange ? (
          <input
            className="inline-block  rounded-2xl border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="1"
            type="number"
            value={inputValue}
            onChange={inputOnChange}
            required
          />
        ) : (
          ""
        )}
       <div className="absolute inset-y-0 right-0 flex items-center  p-1">
        <NcDropDown
      className="py-1 px-4 flex rounded-lg bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
      iconClass="w-4 h-4 sm:h-5 sm:w-5"
      data={tokenOptions}
      panelMenusClass="origin-top-right !w-52 sm:!w-52"
      onClick={handleMenuClick}
      renderTrigger={() => (
        <div className="menu-item menu-dropdown relative px-1 flex">
          <img src={tokenOptions?.[0]?.logo ?? tokenOptions?.[0]?.logo}  height={30} width={30}/>
          <span className="text-neutral-900 dark:text-white ml-1">
            {tokenOptions?.[0]?.label ?? tokenOptions?.[0]?.label}
          </span>
          <DropDownIcon />
        </div>
      )}
      renderItem={(item: any) => (
        <div
          className={
            "flex items-center rounded-md w-full px-3  hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate cursor-pointer"
          }
        >
          <img src={item?.logo} height="50" width={50}/>
          <span className="text-neutral-900 dark:text-white">{item?.label}</span>
        </div>
      )}
    />
        </div>
       
      </div>
    </div>
  );
};

export default TokenSelector;
