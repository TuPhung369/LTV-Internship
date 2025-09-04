export const NOTIFICATION_SELECTED_FIELDS = {
    id: true,
    title:true,
    content:true
};
  
export interface NotificationCreateInput {
    title:string,
    content:string,
    userIds?: string[]
}

export interface NotificationCreateUpdate {
    id:string,
    title?:string,
    content?:string,
    userIds?: string[]
}