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

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface ImageResponse2 {
    id: number,
    image: Blob | null,
    title: string;
    author: string;
    authorId: number;
    description: string;
    resolutionX: number;
    resolutionY: number;
    format: string;
    size: number;
    creationDate: string;
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
    username: string;
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
    isAdmin: boolean;
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface TagResponse{
    id:number;
    name:string;
}

export interface TagRequest{
    name:string;
}

export interface PaginatedResult<T> {
    items: T[];
    totalElements: number;
}

export interface ImageRequest {
    name: string | null;
    format:string;
    resolutionX: number;
    resolutionY: number;
    description: string;
    categories: CategoryResponse[] | null;
    tags: TagResponse[] | null;
}

export interface UserRequest {
    email: string;
    password: string;
}
