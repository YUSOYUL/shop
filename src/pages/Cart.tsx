// src/pages/Cart.tsx
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { cartTotal, clearCart, dec, inc, removeFromCart } from "../features/cart/cartSlice";

const price = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Cart가 비어있습니다.</h2>
        <p className="mb-6 text-gray-600">Cart에 상품을 넣어주세요.</p>
        <Link to="/" className="text-purple-700 underline">계속 쇼핑하기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">장바구니</h1>

      <div className="space-y-6">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-4 pb-6 border-b">
            <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" />

            <div className="flex-1">
              <div className="text-gray-500 text-sm mb-1">{product.category}</div>
              <div className="font-semibold">{product.title}</div>
              <div className="text-sm text-gray-600">
                {product.price} x {qty} = {price(product.price * qty)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 border rounded-md"
                onClick={() => dispatch(dec(product.id))}
              >
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                className="w-8 h-8 border rounded-md"
                onClick={() => dispatch(inc(product.id))}
              >
                +
              </button>
            </div>

            <button
              className="px-4 py-2 rounded-md border hover:opacity-90"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <div className="px-6 py-3 rounded-md" style={{ background: "#efe8de" }}>
          <span className="mr-2">합계:</span>
          <strong>{price(total)}</strong>
        </div>

        <button
          className="px-4 py-2 rounded-md text-white"
          style={{ background: "#4b5563" }}
          onClick={() => alert("결제 플로우는 과제 범위 외입니다 🙂")}
        >
          계산하기
        </button>

        <button
          className="px-4 py-2 rounded-md border hover:opacity-90"
          onClick={() => dispatch(clearCart())}
        >
          모두비우기
        </button>
      </div>
    </div>
  );
}
