import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeCartItem } from "@/store/slices/cartSlice";
import { toast } from "react-toastify";
import { CartState } from "@/lib/definitions";
import { X } from "lucide-react";
import Link from "next/link";

export const MiniCartItem = ({
  name,
  price,
  quantity,
  img,
  id,
  size,
  color,
}: CartState) => {
  const dispatch = useDispatch();
  return (
    <div className="item items-center relative flex p-[20px_35px_20px_20px] border-b border-[1px_solid_hsla(0,0%,51%,.2)] ease duration-300">
      <div className="thumb mr-[15px]">
        <Link href={`/product-details/${id}`}>
          <Image
            src={img}
            alt={name}
            width={1200}
            height={900}
            className="text-transparent object-contain w-[90px] h-[90px]"
          />
        </Link>
      </div>
      <div className="content">
        <a
          href="/item/11232"
          className="mb-3 hover:text-[#B88E2F] ease-out duration-300 text-sm font-medium"
        >
          {name}
        </a>
        <div className="price-wrapper mb-2">
          <span className="text-sm font-medium text-[#B88E2F]">${price}</span>
          <span className="text-xs text-[#525258] font-medium">
            x{quantity}
          </span>
        </div>
        <div className="details text-xs text-[#525258]">
          <span className="mr-2 capitalize">Size: {size}</span>
          <span className="capitalize">Color: {color}</span>
        </div>
      </div>
      <button
        className="absolute cursor-pointer top-[38px] right-4 del"
        onClick={() => {
          dispatch(removeCartItem({ id }));
          toast.error(`${name} removed from cart`, {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
        }}
      >
        {
          <X className="w-5 h-5 text-[#525258] hover:text-[#B88E2F] ease-out duration-300" />
        }
      </button>
    </div>
  );
};
