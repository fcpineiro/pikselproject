import { createSelector } from "reselect";
import {
    SettingsFilterType, SettingsIsGridLayoutType,
    SettingsStateType
} from "../types";

export const getSettings = (state: any): SettingsStateType => state.settings;

export const getSettingsFilter = createSelector(
    getSettings,
    ({ filter }: SettingsStateType): SettingsFilterType => filter
);

export const getSettingsIsGridLayout = createSelector(
    getSettings,
({ isGridLayout }: SettingsStateType): SettingsIsGridLayoutType => isGridLayout
);