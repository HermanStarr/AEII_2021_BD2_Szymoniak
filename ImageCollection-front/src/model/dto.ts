export interface TileImageResponse {
    id: number
    thumb: string;
    title: string;
    author: string;
    authorId: number;
    description: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface ImageResponse {
    image: string;
    title: string;
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