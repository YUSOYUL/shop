import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCategory } from "../features/products/productsSlice";

// 카테고리 한글 라벨(원문이 보이도록 기본은 영어 유지)
const KR: Record<string, string> = {
  electronics: "전자기기",
  jewelery: "쥬얼리",
  "men's clothing": "남성의류",
  "women's clothing": "여성의류",
  all: "모두",
};

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((s) => s.products);

  const all = ["all", ...categories];

  return (
    <div className="flex gap-3 flex-wrap items-center mb-6">
      {all.map((c) => {
        const active = c === selectedCategory;
        return (
          <button
            key={c}
            onClick={() => dispatch(setCategory(c))}
            className={[
              "px-4 py-2 rounded-md border transition-colors",
              active ? "bg-gray-700 text-white border-gray-700" : "bg-white text-gray-800 hover:bg-gray-50",
            ].join(" ")}
          >
            {KR[c] ?? c}
          </button>
        );
      })}
    </div>
  );
}
