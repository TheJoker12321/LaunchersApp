import {create} from 'zustand'

const useStore = create((set) => ({

    launcherChoose: {},
    setLauncher: (objChoose) => set((state) => ({launcherChoose: state.launcherChoose = objChoose})),
    valueUpdated: {},
    setValueUpdated: (updatedObj) => set((state) => ({valueUpdated: state.valueUpdated = updatedObj}))
}))

export default useStore