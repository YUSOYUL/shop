// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "firebase/auth"; // ✅ type-only import
import type { UserProfile } from "../../types";

type AuthState = {
  user: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};

const initialState: AuthState = { user: null, status: "idle" };

const toProfile = (u: User): UserProfile => ({
  uid: u.uid,
  displayName: u.displayName,
  email: u.email,
  photoURL: u.photoURL,
});

// 현재 로그인 상태 구독해 초기화
export const initAuth = createAsyncThunk("auth/init", async () => {
  const user = await new Promise<User | null>((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => {
      unsub();
      resolve(u);
    });
  });
  return user ? toProfile(user) : null;
});

// 이메일 회원가입
export const signUpEmail = createAsyncThunk(
  "auth/signUpEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return toProfile(cred.user);
  }
);

// 이메일 로그인
export const signInEmail = createAsyncThunk(
  "auth/signInEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return toProfile(cred.user);
  }
);

// 구글 로그인
export const signInGoogle = createAsyncThunk("auth/signInGoogle", async () => {
  const cred = await signInWithPopup(auth, googleProvider);
  return toProfile(cred.user);
});

// 로그아웃
export const signOutAll = createAsyncThunk("auth/signOut", async () => {
  await signOut(auth);
  return null;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(initAuth.fulfilled, (s, a) => {
      s.user = a.payload;
      s.status = "succeeded";
    })
      .addCase(signUpEmail.pending, (s) => {
        s.status = "loading";
      })
      .addCase(signUpEmail.fulfilled, (s, a) => {
        s.user = a.payload;
        s.status = "succeeded";
      })
      .addCase(signInEmail.pending, (s) => {
        s.status = "loading";
      })
      .addCase(signInEmail.fulfilled, (s, a) => {
        s.user = a.payload;
        s.status = "succeeded";
      })
      .addCase(signInGoogle.fulfilled, (s, a) => {
        s.user = a.payload;
        s.status = "succeeded";
      })
      .addCase(signOutAll.fulfilled, (s) => {
        s.user = null;
        s.status = "idle";
      });
  },
});

export default slice.reducer;
