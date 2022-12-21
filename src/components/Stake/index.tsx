import React, { useState } from "react";
import ProtocolSelector from "@/components/ProtocolSelector";
import { useBundle } from "@/store";
import Close from "../Button/close";
import { LidoStake, ConvexStake, Venues, Actions } from "types/actions";
import TokenSelector from "../TokenSelector";
import { ETHLogo } from "../Logos";

const Stake = () => {
  const selectedChain = useBundle((state) => state.chain);
  type StakeActions = LidoStake | ConvexStake;
  const StakeActions: string[] = [Actions.LidoStake, Actions.ConvexStake];
  const [ProtocolSelectorAddress,setProtocolSelectorAddress] = useState<string[]>(['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']);
  const [selected, setSelected] = useState({icon: 'https://tokens.1inch.io/0x5a98fcbea516cf06857215779fd812ca3bef1b32.png', name: 'Lido'});

  const [bundleItem, replaceBundleItem] = useState<StakeActions>({
    action: "LidoStake",
    amount: "0",
    token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  });
  const onDelete = () => {};
  
  return (
    <div className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <Close onClick={onDelete}></Close>
      <h1 className="text-2xl dark:text-gray-300">{bundleItem.action}</h1>
      <div className="mt-4 flex">
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
            onChange={(e:any) => {
              console.log('ProtocolSelector', e)
              setSelected({icon: e.icon, name: e.name})
              if(e.value === '0x5a98fcbea516cf06857215779fd812ca3bef1b32'){
                setProtocolSelectorAddress(['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']);
              }
              else if(e.value === '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'){
                setProtocolSelectorAddress(["0xd533a949740bb3306d119cc777fa900ba034cd52",
                "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
                "0x06325440d014e39736583c165c2963ba99faf14e"]);
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
