import Image from "next/image";

export const EmptyCart = ({ name }: { name: string }) => {
  return (
    <div className="empty-card text-center my-20">
      <Image
        src="/assets/images/empty-cart.webp"
        alt="empty-cart"
        width={283}
        height={171}
        className="mx-auto mb-8 text-transparent align-middle"
      />
      <p className="text-[#03041c] mb-6 leading-7">Your {name} is empty</p>
      <a
        className="bg-[#f1f1f1] font-semibold text-sm capitalize hover:bg-[#96732B] ease-out duration-300 rounded-sm hover:text-white text-[#03041c] p-[12px_30px]"
        href="/shop"
      >
        Go to Shop
      </a>
    </div>
  );
};
