export interface TileImageResponse {
    id: number
    thumb: string;
    title: string;
    author: string;
    authorId: number;
    description: string;
    resolutionX: number;
    resolutionY: number;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface ImageResponse {
    id: number;
    image: string;
    title: string;
    author: string;
    authorId: number;
    description: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    icon: undefined | string;
    nickname: string;
    email: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface TagRequest{
    name:string;
}

export interface TagResponse {
    id: number;
    name: string;
}

export interface PaginatedResult<T> {
    items: T[];
    totalElements: number;
}