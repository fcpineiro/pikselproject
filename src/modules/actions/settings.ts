import {
    SettingsFilterValuesType,
    SettingsToggleFilterValueType,
    SettingsToggleFilterValueActionType,
    SettingsToggleLayoutType,
    SettingsToggleLayoutActionType
} from '../types';

export const TOGGLE_FILTER_VALUE: SettingsToggleFilterValueType = '@SETTINGS/TOGGLE_FILTER_VALUE';
export const TOGGLE_LAYOUT: SettingsToggleLayoutType = '@SETTINGS/TOGGLE_LAYOUT';

export const toggleFilterValue = (value: SettingsFilterValuesType): SettingsToggleFilterValueActionType => ({
    type: TOGGLE_FILTER_VALUE,
    payload: value
});

export const toggleLayout = (): SettingsToggleLayoutActionType => ({
    type: TOGGLE_LAYOUT
});