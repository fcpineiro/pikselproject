import data from './data.json';
import {ContentsStateType, ContentType, RawContentType} from "../types";

const parseData = (data: any): ContentsStateType => {
    const contents: ContentsStateType = new Map<number, ContentType>();
    data.map((content: RawContentType) => {
        const episodes = (content.type === 'show') ? {
            episodes: content.episodes.sort()
        } : {};
        return {
            ...content,
            ...{
                categories: content.categories.sort(),
                releaseDate: new Date(content.releaseDate)
            },
            ...episodes
        }
    }).forEach((content: ContentType) => contents.set(content.id, content));
    return contents;
};

export default parseData(data.contents);