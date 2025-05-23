"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMiniCartOpen } from "@/store/slices/miniCartSlice";
import { CartState, WishListState } from "@/lib/definitions";
import { RootState } from "@/store";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import {
  Heart,
  LockIcon,
  ShoppingBagIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { SearchModal } from "./SearchModal";
import { useAppContext } from "@/contexts/AppContext";

export const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const wishList = useSelector((state: RootState) => state.wishList);
  const [isDropdown, setIsDropDown] = useState(false);
  const { openSignIn } = useClerk();
  const cartCount = cartItems.reduce((acc: number, curr: CartState) => {
    return acc + curr.quantity;
  }, 0);
  const wishlistCount = wishList.reduce((acc: number, curr: WishListState) => {
    return acc + curr.quantity;
  }, 0);
  const { router, isAdmin } = useAppContext();

  return (
    <div className="sticky top-0 z-40 w-full shadow-md backdrop-blur bg-[#ffffff70]">
      <header className="relative z-10 flex items-center justify-between px-5 py-2 max-w-screen-2xl lg:px-10 xl:mx-auto xsm:py-4">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 xsm:flex-row logo"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={50}
            height={50}
            className="w-10 h-10 xsm:w-12 xsm:h-12 md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />

          <span className="text-xl xsm:text-2xl md:text-3xl font-bold font-['Montserrat']">
            WeSell BD
          </span>
        </Link>

        <ul
          className={`${
            isDropdown ? "h-[171px]" : "h-0"
          } overflow-y-hidden transition-all max-md:w-full md:h-auto ease-in-out duration-200 md:static absolute top-14 md:bg-inherit bg-white md:shadow-none shadow-[0px_5px_10px_#14303a15] md:w-['auto'] md:px-0 px-4 md:flex left-0 justify-center gap-10 lg:gap-[75px]`}
        >
          <li className="md:p-[unset] py-2 md:border-none border-b border-[#d6d9dc]">
            <Link
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
              href="/"
              className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#83AAC9] before:h-[2px]"
            >
              Home
            </Link>
          </li>

          <li className="md:p-[unset] py-2 md:border-none border-b border-[#d6d9dc]">
            <Link
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
              href="/shop"
              className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#83AAC9] before:h-[2px]"
            >
              Shop
            </Link>
          </li>

          <li className="md:p-[unset] py-2 md:border-none border-b border-[#d6d9dc]">
            <Link
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
              href="/about"
              className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#83AAC9] before:h-[2px]"
            >
              About
            </Link>
          </li>

          <li className="md:p-[unset] py-2">
            <Link
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
              href="/contact"
              className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#83AAC9] before:h-[2px]"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center icons gap-3 xsm:gap-5 lg:gap-11">
          <SearchModal />

          <Link href="/wishlist" className="">
            <Button
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 md:w-6 h-5 md:h-6" />
              <span
                className={`${
                  wishlistCount < 1 ? "invisible opacity-0" : ""
                } absolute z-10 flex justify-center items-center -top-[15px] -right-3 text-xs font-bold bg-black w-[24px] h-[24px] border-[3px] border-white text-center rounded-full text-white`}
              >
                {wishlistCount}
              </span>
            </Button>
          </Link>

          <Button
            className="rounded-full relative z-20"
            aria-label="MiniCart"
            size={"icon"}
            variant={"ghost"}
          >
            <ShoppingCart
              onClick={() => dispatch(isMiniCartOpen("openMiniCart"))}
              className="w-5 md:w-6 cursor-pointer ease-in-out transition-all duration-200 hover:text-[#1c1d25] cart"
            />
            <span
              className={`${
                cartCount < 1 ? "invisible opacity-0" : ""
              } absolute z-10
                 flex justify-center items-center -top-[15px] -right-3 text-xs font-bold bg-black w-[24px] h-[24px] border-[3px] border-white text-center rounded-full text-white`}
            >
              {cartCount}
            </span>
          </Button>

          <Button
            className="rounded-full"
            aria-label="User"
            size={"icon"}
            variant={"ghost"}
          >
            <SignedIn>
              <UserButton>
                {isAdmin && (
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Admin Dashboard"
                      labelIcon={<LockIcon className="size-3" />}
                      onClick={() => router.push("/admin")}
                    />
                  </UserButton.MenuItems>
                )}
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<ShoppingBagIcon className="size-3" />}
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>

            <SignedOut>
              <User
                className="w-5 md:w-6 cursor-pointer ease-in-out transition-all duration-200 hover:text-[#1c1d25] user"
                onClick={(e) => {
                  e.preventDefault();
                  openSignIn();
                }}
              />
            </SignedOut>
          </Button>

          <Button
            className="block space-y-1 rounded-full cursor-pointer md:hidden"
            onClick={() => setIsDropDown(!isDropdown)}
            aria-label="Dropdown"
            variant={"ghost"}
            size={"icon"}
          >
            <span
              className={`${
                isDropdown ? "-rotate-45 relative top-[6px]" : "-rotate-0"
              } w-5 h-[2px] bg-[#051441] transition-all ease-in-out duration-300 block`}
            ></span>
            <span
              className={`${
                isDropdown ? "rotate-45" : "rotate-0"
              } w-5 h-[2px] bg-[#051441] transition-all ease-in-out duration-300 block`}
            ></span>
            <span
              className={`${
                isDropdown ? "opacity-0" : "opacity-100"
              } w-5 h-[2px] bg-[#051441] transition-all ease-in-out duration-300 block`}
            ></span>
          </Button>
        </div>
      </header>
    </div>
  );
};
