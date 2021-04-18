export interface TileImageResponse {
    thumb: undefined;
    title: string;
    author: string;
    authorId: number;
    description: string;
}

export interface ImageResponse {
    image: undefined;
    title: string;
    author: string;
    authorId: number;
    description: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    icon: undefined;
    nickname: string;
    email: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface PaginatedResult<T> {
    items: T[];
    totalElements: number;
}