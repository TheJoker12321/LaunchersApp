import {create} from 'zustand'

const useStore = create((set) => ({

    launcherChoose: {},
    setLauncher: (objChoose) => set((state) => ({launcherChoose: state.launcherChoose = objChoose})),
    valueUpdated: {},
    setValueUpdated: (updatedObj) => set((state) => ({valueUpdated: state.valueUpdated = updatedObj})),
    tokenStore: '',
    setTokenStore: (newToken) => set((state) => ({tokenStore: state.tokenStore = newToken}))
}))

export default useStore