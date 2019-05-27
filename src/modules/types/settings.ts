export type SettingsFilterValuesType = 'show' | 'episode';

export type SettingsFilterType = Set<SettingsFilterValuesType>;

export type SettingsIsGridLayoutType = boolean;

export interface SettingsStateType {
    filter: SettingsFilterType,
    isGridLayout: SettingsIsGridLayoutType
}

export type SettingsToggleFilterValueType = '@SETTINGS/TOGGLE_FILTER_VALUE';

export type SettingsToggleFilterValueActionType = {
    type: SettingsToggleFilterValueType,
    payload: SettingsFilterValuesType
};

export type SettingsToggleLayoutType = '@SETTINGS/TOGGLE_LAYOUT';

export type SettingsToggleLayoutActionType = {
    type: SettingsToggleLayoutType
};

export type SettingsActionsType = (
    SettingsToggleFilterValueActionType |
    SettingsToggleLayoutActionType
);