import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { openMiniCart } from "../features/ui/uiSlice";

const price = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col min-h-[420px]">
      <Link
        to={`/product/${product.id}`}
        className="h-56 mb-4 flex items-center justify-center"
        aria-label={`${product.title} 상세 보기`}
      >
        <img src={product.image} alt={product.title} className="max-h-full object-contain" />
      </Link>

      <Link
        to={`/product/${product.id}`}
        className="font-semibold min-h-[3rem] overflow-hidden hover:underline"
      >
        {product.title}
      </Link>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-md border hover:opacity-90"
          onClick={() => {
            dispatch(addToCart(product));   // ← product 로 수정
            dispatch(openMiniCart());
          }}
        >
          장바구니에 담기
        </button>
        <div className="font-semibold">{price(product.price)}</div>
      </div>
    </div>
  );
}
