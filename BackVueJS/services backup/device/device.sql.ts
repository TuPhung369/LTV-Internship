export const DEVICE_SELECTED_FIELDS = {
    id: true,
    userId:true,
    dvcId:true,
    regToken:true
};
  
export interface DeviceCreateInput {
    dvcId:string,
    regToken:string,
    userId:string
}