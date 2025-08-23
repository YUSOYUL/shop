// src/pages/Product.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { openMiniCart } from "../features/ui/uiSlice";
import type { Product as ProductType } from "../types";
import { fetchProduct } from "../api/fakestore";

const price = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function Product() {
  const { id } = useParams();
  const pid = Number(id);
  const dispatch = useAppDispatch();

  const fromStore = useAppSelector((s) => s.products.items.find((p) => p.id === pid));
  const [data, setData] = useState<ProductType | null>(fromStore ?? null);
  const [loading, setLoading] = useState(!fromStore);

  // ✅ 버튼 상태: 클릭 후 텍스트/스타일 변경
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!fromStore) {
      setLoading(true);
      fetchProduct(pid)
        .then((d) => setData(d))
        .finally(() => setLoading(false));
    }
  }, [fromStore, pid]);

  const catKr = useMemo(() => {
    if (!data) return "";
    const KR: Record<string, string> = {
      electronics: "전자기기",
      jewelery: "쥬얼리",
      "men's clothing": "남성의류",
      "women's clothing": "여성의류",
    };
    return KR[data.category] ?? data.category;
  }, [data]);

  if (loading || !data) {
    return <div className="max-w-6xl mx-auto px-4 py-10">로딩 중…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* 이미지 */}
        <div className="w-full bg-white rounded-xl border p-8 flex items-center justify-center">
          <img src={data.image} alt={data.title} className="max-h-[520px] object-contain" />
        </div>

        {/* 정보 */}
        <div>
          <div className="text-gray-400 font-semibold mb-3">{catKr}</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">{data.title}</h1>

          <div className="text-5xl font-extrabold mb-6">{price(data.price)}</div>

          <p className="text-gray-600 leading-relaxed mb-10">{data.description}</p>

          <div className="flex gap-6">
            {/* ✅ 클릭 후 텍스트 변경 + hover 시 흰바탕으로 */}
            <button
              onClick={() => {
                dispatch(addToCart(data));
                dispatch(openMiniCart());
                setAdded(true);
              }}
              className={[
                "px-8 py-4 rounded-md border border-gray-700",
                "transition-colors duration-150",
                // 기본은 어두운 회색 버튼
                "bg-gray-700 text-white",
                // hover 시 흰바탕 버튼
                "hover:bg-white hover:text-gray-800",
                // 포커스 접근성
                "focus:outline-none focus:ring-2 focus:ring-gray-300",
              ].join(" ")}
              aria-live="polite"
            >
              {added ? "장바구니에 담음" : "장바구니에 담기"}
            </button>

            <Link
              to="/cart"
              className="px-8 py-4 rounded-md text-white bg-gray-700 hover:opacity-90"
            >
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
