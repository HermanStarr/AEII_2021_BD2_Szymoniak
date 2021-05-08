export interface TileImageResponse {
    id: number
    thumb: string;
    title: string;
    author: string;
    authorId: number;
    description: string;
   // tags: TagResponse[];
}

export interface ImageResponse {
    image: string;
    title: string;
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