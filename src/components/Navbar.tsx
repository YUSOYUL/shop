import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { signOutAll } from "../features/auth/authSlice";
import MiniCart from "./MiniCart";
import { toggleMiniCart } from "../features/ui/uiSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((n, it) => n + it.qty, 0));
  const user = useAppSelector((s) => s.auth.user);
  const miniOpen = useAppSelector((s) => s.ui.miniCartOpen);

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-700">Shop</Link>

        <div className="flex items-center gap-4">
          {/* 카트 아이콘 래퍼를 relative로 → 팝업이 여기 기준으로 뜸 */}
          <div className="relative">
            {/* 아이콘 클릭 시 팝업 토글 (원하면 Link로 교체해도 됨) */}
            <button
              aria-label="미니카트 열기"
              onClick={() => dispatch(toggleMiniCart())}
              className="relative"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-purple-700 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {miniOpen && <MiniCart />}
          </div>

          {user ? (
            <button onClick={() => dispatch(signOutAll())}
                    className="px-4 py-2 rounded-md border hover:opacity-90">
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 rounded-md border hover:opacity-90">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
