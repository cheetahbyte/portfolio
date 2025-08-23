import {create} from "zustand"

export const useLightStore = create((set) => ({
    enabled: true,
    toggle: () => set((state: {enabled: boolean}) => ({enabled: !state.enabled})),
}))

import { createStore } from 'zustand/vanilla'

export type LightState = {
    toggled: boolean;
}

export type LightActions = {
  toggle: () => void;
}

export type LightStore = LightState & LightActions;

export const defaultInitState: LightState = {
    toggled: true
}

export const createLightStore = (
    initState: LightState = defaultInitState,
) => {
    return createStore<LightStore>()((set) => ({
        ...initState,
        toggle: () => set((state) => ({toggled: !state.toggled}))
    }))
}

export const initLightStore = (): LightState => {
    return {toggled: false}
}