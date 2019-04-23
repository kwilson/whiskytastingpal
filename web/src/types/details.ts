export interface IDetails {
    title: string;
    tastingNotes: Array<{ title?: string, value: string }>
    image: string;
}

export interface IExtendedDetails extends IDetails {
    url: string;
}
