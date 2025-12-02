import { Wallet } from "lucide-react";

export function ConnectButton() {
  return (
    <button className="bg-[#155DFC] rounded-[10px] flex gap-[8px] px-[20px] py-[8px]">
      <Wallet size={18} className="my-auto" />
      <span className="text-[16px]">Connect Wallet</span>
    </button>
  );
}
