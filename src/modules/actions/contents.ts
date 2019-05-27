import {
    ContentType,
    ContentsUpdateContentType,
    ContentsUpdateContentActionType
} from "../types";

export const UPDATE_CONTENT: ContentsUpdateContentType = '@CONTENTS/UPDATE_CONTENT';

export const updateContent = (content: ContentType): ContentsUpdateContentActionType => ({
    type: UPDATE_CONTENT,
    payload: content
});