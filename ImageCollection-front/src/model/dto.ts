export interface ImageThumbResponse {
    id: number
    name: string;
    owner: string;
    ownerId: number;
    creationDate: string;
    thumb: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface ImageResponse {
    id: number,
    image: string,
    name: string;
    ownerNickname: string;
    ownerId: number;
    description: string;
    resolutionX: number;
    resolutionY: number;
    format: string;
    size: number;
    creationDate: string;
    tags: TagResponse[];
    categories: CategoryDTO[];
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
    admin: boolean;
}

export interface UserPublicResponse {
    id: number;
    icon: undefined | string;
    nickname: string;
    email: string;
    isAdmin: boolean;
}

export interface CategoryDTO {
    id: number | null;
    name: string;
    backup: boolean;
}

export interface TagResponse{
    id:number;
    name:string;
}

export interface PaginatedResult<T> {
    items: T[];
    elementCount: number;
}

export interface ImageRequest {
    name: string | null;
    format:string;
    resolutionX: number;
    resolutionY: number;
    description: string;
    categories: CategoryDTO[] | null;
    tags: string | null;
}

export interface UserRequest {
    email: string;
    password: string;
}
