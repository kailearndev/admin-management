

export interface ActivitiesValue {
    id?: string;
    title: string;
    content: string;
    description: string;
    isPublish: boolean;
    video?: string;
    videoUrl?: string;
    imageArticle: string;
    imageArticleUrl?: string;
    imageHeaders: string[];
    createdDate?: string; // or Date if you want to convert it to a Date object
    updatedDate?: string; // or Date if you want to convert it to a Date object
    ownerId?: string;
}
export const ActivitiesState: ActivitiesValue = {

    title: "",
    content: "",
    description: "",
    isPublish: true,
    video: "",
    imageArticle: "",
    imageHeaders: [],


}


export interface ActivitiesValueUpdate {
    id?: string;
    title: string;
    content: string;
    description: string;
    isPublish: boolean;
    video?: string;
    videoUrl?: string;
    imageArticle: string;
    imageArticleUrl?: string;
    imageHeaders: any[];
    createdDate?: string; // or Date if you want to convert it to a Date object
    updatedDate?: string; // or Date if you want to convert it to a Date object
    ownerId?: string;
}
export const ActivitiesUpdate: ActivitiesValueUpdate = {

    title: "",
    content: "",
    description: "",
    isPublish: true,
    video: '',
    imageArticle: "",
    imageHeaders: [],


}