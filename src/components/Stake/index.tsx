import React, { useEffect, useState } from "react";
import ProtocolSelector from "@/components/ProtocolSelector";
import { useBundle } from "@/store";
import Close from "../Button/close";
import { LidoStake, ConvexStake, Venues, Actions, LidoStakeParamToken, ConvexStakeParamToken } from "types/actions";
import TokenSelector from "../TokenSelector";
import { ETHLogo } from "../Logos";
import { DEFI_LLAMA_LIST } from "@/constants";

const Stake = () => {
  const selectedChain = useBundle((state) => state.chain);
  type StakeActions = LidoStake | ConvexStake;
  const StakeActions: string[] = [Actions.LidoStake, Actions.ConvexStake];
  const [ProtocolSelectorAddress,setProtocolSelectorAddress] = useState<any[]>(LidoStakeParamToken?._def?.values);
  const [selected, setSelected] = useState({});
  const [bundleItem, replaceBundleItem] = useState<StakeActions>({
    action: "LidoStake",
    amount: "0",
    token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  });
  const [protocolList, setProtocolList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(DEFI_LLAMA_LIST);
      const data = await response.json();

      let finalData: React.SetStateAction<any[]> = [];
      if (Array.isArray(data)) {
        finalData = data
          .filter(
            (item) => item.name === "Lido" || item.name === "Convex Finance"
          )
          .map((m) => {
            return {
              id: m.id,
              name: m.name,
              icon: m.logo,
              value: m.address,
            };
          });
          setSelected(finalData[0])
      }

      setProtocolList(finalData);
    })();
  }, []);
  const onDelete = () => {};
  
  return (
    <div className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <Close onClick={onDelete}></Close>
      <h1 className="text-2xl dark:text-gray-300 text-gray-800 font-semibold">{bundleItem.action}</h1>
      <div className="mt-3 flex">
        <TokenSelector
          chain={selectedChain}
          inputValue={bundleItem.amount}
          inputOnChange={(e) => {
            replaceBundleItem({
              ...bundleItem,
              amount: e.target.value,
            });
          }}
          
          filter={ProtocolSelectorAddress}
        />
        <span className="pt-3 px-8 dark:text-gray-200">On</span>
        <div className="w-48 pt-1 pl-2">
          <ProtocolSelector
            chain={selectedChain}
            protocolList={protocolList}
            onChange={(e:any) => {
              console.log('ProtocolSelector', e)
              setSelected({icon: e.icon, name: e.name})
              if(e.value === '0x5a98fcbea516cf06857215779fd812ca3bef1b32'){
                setProtocolSelectorAddress(LidoStakeParamToken?._def?.values);
              }
              else if(e.value === '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'){
                setProtocolSelectorAddress(ConvexStakeParamToken?._def?.values);
              }
              replaceBundleItem({
                ...bundleItem,
                token: e.value,
              });
            }}
            selected={selected}
            
            filter={StakeActions.map(
              (action) => Venues[action as keyof typeof Venues]
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Stake;
