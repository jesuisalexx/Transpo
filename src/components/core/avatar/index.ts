export enum avatarShape {
    CIRCLE = 'circle',
    SQUARE = 'square',
}

export enum avatarSize {
    XS = 'xs',
    S = 's',
    M = 'm',
    L = 'l',
}
export interface AvatarProps {
    shape?: avatarShape,
    size?: avatarSize,
    src?: string,
}
