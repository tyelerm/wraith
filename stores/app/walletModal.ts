import { create } from "zustand";

export const useWalletModalStore = create((set) => ({
    isOpen: false,
    toggleWalletModal: () => set((state: any) => ({ isOpen: !state.isOpen })),
}));
