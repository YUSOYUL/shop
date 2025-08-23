import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCategories, fetchProducts } from "../features/products/productsSlice";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, selectedCategory } = useAppSelector((s) => s.products);

  // 최초 로딩
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const visible =
    selectedCategory === "all"
      ? items
      : items.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Products</h1>

      <CategoryFilter />

      <div className="text-gray-600 mb-4">Showing: {visible.length} items</div>

      {status === "loading" && <div className="py-10">로딩 중…</div>}
      {status === "failed" && <div className="py-10 text-red-600">목록을 불러오지 못했습니다.</div>}

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
