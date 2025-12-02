import { Wallet } from "lucide-react";

export function ConnectButton() {
  return (
    <button className="bg-[#155DFC] hover:bg-[#155DFC]/70 rounded-[10px] flex gap-[6px] px-[18px] py-[8px]">
      <Wallet size={16} className="my-auto" />
      <span className="text-[14px]">Connect Wallet</span>
    </button>
  );
}
