import create from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  setAuthenticated: (auth: boolean) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
}))

export default useAuthStore
