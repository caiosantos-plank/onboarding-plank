'use client'

import { create } from "zustand";
import { User } from "../utils/types/user";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthActions {
    setUser: (user: User | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setUser: (user) => set({ user }),
}));