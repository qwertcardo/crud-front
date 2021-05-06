export interface User {
    id?: number;
    name: string;
    email: string;
    cpf?: string;
    birthDate: Date;
    login: string;
    password?: string;
}

export interface LoginRequest {
    principal: string;
    credential: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    inStock: number;
    selled: number;
    owner: {id: number, name: string};
}