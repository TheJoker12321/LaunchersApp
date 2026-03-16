import {create} from 'zustand'

const useStore = create((set) => ({

    launcherChoose: {},
    setLauncher: (objChoose) => set((state) => ({launcherChoose: state.launcherChoose = objChoose}))
}))

export default useStore