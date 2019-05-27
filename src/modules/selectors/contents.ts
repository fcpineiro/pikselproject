import { createSelector } from "reselect";
import {
    ContentType,
    ContentsArrayType,
    ContentsGetContentType,
    ContentsGetEpisodesType,
    ContentsStateType,
    SettingsFilterType
} from "../types";
import { getSettingsFilter } from './settings';

export const getContents = (state: any): ContentsStateType => state.contents;

export const getFilteredContents = createSelector(
    getContents,
    getSettingsFilter,
    (contents: ContentsStateType, filter: SettingsFilterType): ContentsArrayType => (
        Array.from(contents.values()).filter(content => filter.size === 0 || filter.has(content.type))
    )
);

export const getEpisodes = createSelector(
    getContents,
    (contents: ContentsStateType): ContentsArrayType => (
        Array.from(contents.values()).filter(content => content.type === 'episode')
    )
);

export const getContentById = createSelector(
    getContents,
    (contents: ContentsStateType): ContentsGetContentType => (id: number): ContentType => contents.get(id)
);

export const getEpisodesByIds = createSelector(
    getContentById,
    (
        getContent: ContentsGetContentType
    ): ContentsGetEpisodesType => (
        ids: Array<number>
    ): ContentsArrayType => (
        ids.map((id: number) => getContent(id))
    )
);