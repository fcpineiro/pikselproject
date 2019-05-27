import data from '../data';
import { UPDATE_CONTENT } from "../actions";
import {
    ContentType,
    ContentsStateType
} from '../types';

const defaultState: ContentsStateType = data;

const contents = (state: ContentsStateType = defaultState, action: any) => {
    switch (action.type) {
        case UPDATE_CONTENT:
            const newState: ContentsStateType = new Map<number, ContentType>(state);
            newState.delete(action.payload.id);
            newState.set(action.payload.id, action.payload);
            return newState;
        default:
            return state;
    }
};

export default contents;