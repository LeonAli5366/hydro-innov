"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const NavData = [
  { title: "Water", href: "Water" },
  { title: "Solar panels", href: "solarpanels" },
  { title: "HVAC", href: "hvac" },
];

const SolarPanelsData = [
  {
    name: "Solar Panels",
    image: "/images/Mega-Menu-Energy-Solar-Panels.webp",
  },
  {
    name: "Solar Roof",
    image: "/images/Mega-Menu-Energy-Solar-Roof.webp",
  },
  {
    name: "Powerwall",
    image: "/images/Mega-Menu-Energy-Powerwall-US.webp",
  },
  {
    name: "Megapack",
    image: "/images/Mega-Menu-Energy-Megapack.webp",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState("/images/logo-white.png");

  // Detect scroll position and toggle `isScrolled` state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setLogo("/images/logo-black.png");
      } else {
        setIsScrolled(false);
        setLogo("/images/logo-white.png");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${
        isScrolled ? "bg-white text-black shadow" : "bg-transparent text-white"
      } sm:fixed sm:top-0 h-14 w-full sm:flex items-center hidden sm:px-16 px-5 z-50 transition-all duration-300`}
    >
      <Link href={"/"}>
        <abbr title="Home">
          <Image src={logo} alt="" width={100} height={100} />
        </abbr>
      </Link>
      {/* navigation menu */}
      <div className="w-full flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="ml-60 bg-transparent"
                onMouseEnter={() => setIsScrolled(true)}
                onMouseLeave={() => setIsScrolled(false)}
              >
                Water
              </NavigationMenuTrigger>
              <NavigationMenuContent onMouseEnter={() => setIsScrolled(true)}>
                <div className="flex items-center gap-20 p-20">
                  {SolarPanelsData?.map((data, i) => {
                    return (
                      <div key={i} className="flex flex-col items-center gap-5">
                        <Image
                          src={data?.image}
                          alt=""
                          width={500}
                          height={500}
                          className="min-w-[200px]"
                        />
                        <span className="text-nowrap text-lg font-semibold">
                          {data?.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <button className="text-sm font-medium text-black opacity-80">
                            Learn
                          </button>
                          <button className="text-sm font-medium text-black opacity-80">
                            Order
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent"
                onMouseEnter={() => setIsScrolled(true)}
                onMouseLeave={() => setIsScrolled(false)}
              >
                Solar Panels
              </NavigationMenuTrigger>
              <NavigationMenuContent onMouseEnter={() => setIsScrolled(true)}>
                <div className="flex items-center gap-20 p-20">
                  {SolarPanelsData?.map((data, i) => {
                    return (
                      <div key={i} className="flex flex-col items-center gap-5">
                        <Image
                          src={data?.image}
                          alt=""
                          width={500}
                          height={500}
                          className="min-w-[200px]"
                        />
                        <span className="text-nowrap">{data?.name}</span>
                        <div className="flex items-center gap-3">
                          <NavigationMenuLink>
                            <a href={"/solarpanels"}>
                              <button className="text-sm font-medium text-black opacity-80">
                                Learn
                              </button>
                            </a>
                          </NavigationMenuLink>
                          <button className="text-sm font-medium text-black opacity-80">
                            Order
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="mr-60 bg-transparent"
                onMouseEnter={() => setIsScrolled(true)}
                onMouseLeave={() => setIsScrolled(false)}
              >
                HVAC
              </NavigationMenuTrigger>
              <NavigationMenuContent onMouseEnter={() => setIsScrolled(true)}>
                <div className="flex items-center gap-20 p-20">
                  {SolarPanelsData?.map((data, i) => {
                    return (
                      <div key={i} className="flex flex-col items-center gap-5">
                        <Image
                          src={data?.image}
                          alt=""
                          width={500}
                          height={500}
                          className="min-w-[200px]"
                        />
                        <span className="text-nowrap">{data?.name}</span>
                        <div className="flex items-center gap-3">
                          <button className="text-sm font-medium text-black opacity-80">
                            Learn
                          </button>
                          <button className="text-sm font-medium text-black opacity-80">
                            Order
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-x-3 max-sm:hidden">
        <button className="transition-all duration-300 text-white rounded text-sm py-1 px-5 bg-blue-500 hover:scale-110">
          Contact
        </button>
      </div>
      <button className="text-sm font-semibold text-white backdrop-blur px-3 py-1 rounded sm:hidden">
        Menu
      </button>
    </header>
  );
}
