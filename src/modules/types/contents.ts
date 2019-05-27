export interface ContentType {
    id: number,
    title: string,
    type: 'show' | 'episode',
    categories: Array<string>,
    synopsis: string,
    releaseDate: Date,
    score: number,
    episodes?: Array<number>,
    imageUrl: string
}

export type ContentEditableKeysType = 'title'
    | 'categories'
    | 'synopsis'
    | 'releaseDate'
    | 'score'
    | 'episodes'
    | 'imageUrl';

export type ContentsArrayType = Array<ContentType>;

export type ContentsGetContentType = (id: number) => ContentType;

export type ContentsGetEpisodesType = (ids: Array<number>) => ContentsArrayType;

export type ContentsUpdateContentType = '@CONTENTS/UPDATE_CONTENT';

export type ContentsUpdateContentActionType = {
    type: ContentsUpdateContentType,
    payload: ContentType
};

export type ContentsStateType = Map<number, ContentType>;

