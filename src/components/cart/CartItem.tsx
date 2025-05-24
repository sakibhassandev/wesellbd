import { CartState, CommonCartSectionProps } from "@/lib/definitions";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const CartItem = ({
  id,
  img,
  name,
  color,
  size,
  price,
  discountPrice,
  quantity,
  toastName,
  increaseAction,
  decreaseAction,
  removeAction,
}: CartState & CommonCartSectionProps) => {
  const dispatch = useDispatch();

  return (
    <tr className="bg-white border-b ">
      <td className="px-4 py-5 border-r border-[#eaedff]">
        <Link href={`/product-details/${id}`}>
          <Image
            src={img}
            alt={img}
            className="w-20 max-w-full max-h-full mx-auto duration-300 ease-linear hover:scale-105 md:w-32"
            width={1200}
            height={900}
          />
        </Link>
      </td>
      <td className="px-6 py-4 text-center border-r border-[#eaedff]">
        <Link
          href={`/product-details/${id}`}
          className="hover:text-[#B88E2F] ease-out duration-300"
        >
          <span className="capitalize">Name: {name}</span> <br />
          <span className="capitalize">Color: {color}</span> <br />
          <span className="capitalize">Size: {size}</span>
        </Link>
      </td>
      <td className="px-6 py-4 text-center border-r border-[#eaedff]">
        <span className="amount">${discountPrice ? discountPrice : price}</span>
      </td>
      <td className="px-6 py-4 border-r border-[#eaedff]">
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              dispatch(decreaseAction({ id }));
              toast.error(`1 ${name} remove from ${toastName}`, {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
              });
            }}
            className="w-6 h-6 hover:text-[#B88E2F] ease-out duration-300 p-1 rounded-full me-3"
            type="button"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h16"
              />
            </svg>
          </button>
          <div>
            <input
              value={quantity}
              onChange={() => ""}
              id="first_product"
              className=" w-14 border focus:border-[#B88E2F] ease-out duration-300 text-center outline-none text-sm rounded-lg block px-2.5 py-1 "
              required
            />
          </div>
          <button
            onClick={() => {
              dispatch(increaseAction({ id }));
              toast.success(`1 ${name} added to ${toastName}`, {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
              });
            }}
            className="w-6 hover:text-[#B88E2F] ease-out duration-300 h-6 p-1 rounded-full ms-3"
            type="button"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 border-r border-[#eaedff] text-center">
        ${(quantity * (discountPrice ? discountPrice : price)).toFixed(2)}
      </td>
      <td className="px-6 text-center py-4 border-r border-[#eaedff]">
        <button
          className="hover:text-[#B88E2F] ease-out duration-300"
          onClick={() => {
            dispatch(removeAction({ id }));
            toast.error(`${name} remove from ${toastName}`, {
              position: "top-center",
              autoClose: 2000,
              theme: "light",
            });
          }}
        >
          <X className="text-xl" />
        </button>
      </td>
    </tr>
  );
};
