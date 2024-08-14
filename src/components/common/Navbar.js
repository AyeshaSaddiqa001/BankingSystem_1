"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  //   console.log(pathname);
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Transactions",
      url: "/transactions",
    },
    {
      name: "Account",
      url: "/account",
    },
  ];
  return (
    <>
      <nav className="w-full h-16 container mx-auto border border-black flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">Banking System</h1>
        <ul className="flex gap-4">
          {links.map((link, idx) => {
            return (
              <li
                className={`relative group ${
                  pathname === link.url ? "font-semibold" : ""
                }`}
              >
                <a href={link.url}>{link.name}</a>
                <span
                  className={`absolute bottom-0 left-0 w-0 border-b-2 border-black group-hover:w-full transition-all duration-300 ease-linear`}
                ></span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
