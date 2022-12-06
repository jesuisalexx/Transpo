export type SidebarButton = {
    value: string,
    icon: string,
    options?: [{
        value: string
    }]
    to: string,
};
export type SidebarUserData = {
    name: string,
    mail: string,
};
export interface SidebarProps {
    buttons: SidebarButton[],
    userdata: SidebarUserData,
    avatar?: string,
}
