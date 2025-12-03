"use client";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "./ConnectButton";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  const navRoutes = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Operator",
      href: "/operator",
    },
    {
      label: "AVS",
      href: "/avs",
    },
    {
      label: "Staker",
      href: "/staker",
    },
    {
      label: "Strategy",
      href: "/strategy",
    },
  ];

  return (
    <nav className="flex border-b-[1.33px] border-[#27272A80] w-full h-fit">
      <div className="flex justify-between max-w-[1440px] mx-auto w-full px-[108px] py-[12px]">
        <div className="flex">
          <Image
            src={"/assets/png/eigenwatch.png"}
            alt="logo"
            width={147}
            height={43}
          />
        </div>
        <div className="flex my-auto gap-[32px]">
          {navRoutes.map((route, index) => {
            const isActive =
              route.href === "/"
                ? pathname === route.href
                : pathname.startsWith(route.href);
            return (
              <Link key={index} href={route.href}>
                <button
                  className={`flex h-[40px] py-[8px] ${
                    isActive
                      ? "px-[24px] rounded-[20px] bg-[#1C398E33]"
                      : "bg-transparent"
                  }`}
                >
                  <span
                    className={`text-[16px] my-auto ${
                      isActive ? "text-white" : "text-[#9F9FA9]"
                    }`}
                  >
                    {route.label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
        <div className="flex my-auto">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
