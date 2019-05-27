import {
    TOGGLE_FILTER_VALUE,
    TOGGLE_LAYOUT
} from '../actions';
import {
    SettingsActionsType,
    SettingsFilterValuesType,
    SettingsStateType
} from '../types';

const defaultState: SettingsStateType = {
    filter: new Set<SettingsFilterValuesType>(),
    isGridLayout: false
};

const settings = (state: SettingsStateType = defaultState, action: SettingsActionsType) => {
    switch(action.type) {
        case TOGGLE_FILTER_VALUE:
            const { payload } = action;
            const filter = new Set<SettingsFilterValuesType>(state.filter);

            if (filter.has(payload)) {
                filter.delete(payload);
            } else {
                filter.add(payload);
            }
            return {
                ...state,
                filter,
            };
        case TOGGLE_LAYOUT:
            return {
                ...state,
                isGridLayout: !state.isGridLayout,
            };
        default:
            return state;
    }
};

export default settings;