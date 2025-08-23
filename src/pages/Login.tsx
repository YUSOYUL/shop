import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { signInEmail, signUpEmail } from "../features/auth/authSlice";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleEmailSignIn = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await dispatch(signInEmail({ email, password })).unwrap?.();
      setMsg("로그인 성공");
    } catch (e: any) {
      setMsg(e?.message ?? "로그인 실패");
    } finally {
      setBusy(false);
    }
  };

  const handleEmailSignUp = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await dispatch(signUpEmail({ email, password })).unwrap?.();
      setMsg("회원가입 완료");
    } catch (e: any) {
      setMsg(e?.message ?? "회원가입 실패");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setMsg("Google 로그인 성공");
    } catch (e: any) {
      setMsg(e?.message ?? "Google 로그인 실패");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border p-6 shadow-sm">
        <h1 className="text-4xl font-bold mb-6 text-center">로그인</h1>

        <div className="space-y-3">
          <input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />

          <button
            onClick={handleEmailSignIn}
            disabled={busy}
            className="w-full rounded-md border px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            이메일로 로그인
          </button>

          <button
            onClick={handleEmailSignUp}   // ← 반드시 이 함수명을 사용
            disabled={busy}
            className="w-full rounded-md border px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            이메일로 회원가입
          </button>

          <button
            onClick={handleGoogle}
            disabled={busy}
            className="w-full rounded-md border px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            Google로 로그인
          </button>

          {msg && (
            <p className="text-center text-sm text-gray-600 pt-2" aria-live="polite">
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
