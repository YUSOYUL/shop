import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCart, cartTotal } from "../features/cart/cartSlice";
import { closeMiniCart } from "../features/ui/uiSlice";

export default function MiniCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = cartTotal(items);
  const boxRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        dispatch(closeMiniCart());
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [dispatch]);

  return (
    <div
      ref={boxRef}
      className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-xl border shadow-lg z-50"
      role="dialog"
      aria-label="미니카트"
    >
      <div className="max-h-[320px] overflow-auto divide-y">
        {items.length === 0 ? (
          <div className="p-5 text-sm text-gray-600">Cart가 비어 있습니다.</div>
        ) : (
          items.map(({ product, qty }) => (
            <div key={product.id} className="p-4 flex gap-3">
              <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">{product.category}</div>
                <div className="font-medium text-sm line-clamp-2">{product.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {product.price} x {qty} = ${(product.price * qty).toFixed(2)}
                </div>
              </div>
              <button
                title="삭제"
                className="text-gray-400 hover:text-gray-700"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="font-semibold">합계: ${total.toFixed(2)}</div>
        <Link
          to="/cart"
          className="px-4 py-2 rounded-md text-white"
          style={{ background: "#4b5563" }}
          onClick={() => dispatch(closeMiniCart())}
        >
          장바구니로 이동
        </Link>
      </div>
    </div>
  );
}
