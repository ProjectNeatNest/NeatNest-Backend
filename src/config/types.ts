import { Request } from 'express';

export interface User {
    user_id: number;
    name: string;
    surname: string;
    surname_2: string | null;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface Housing {
    housing_id: number;
    name: string;
    created_at: Date;
}

export interface Areas {
    area_id: number;
    name: string;
    housing_id: number;
    created_at: Date;
}

export interface DefaultAreas {
    defaultArea_id: number;
    name: string;
    created_at: Date;
}

export interface Tasks {
    task_id: number;
    name: string;
    area_id: number;
    created_at: Date;
    duration: string;
    periodicity: number;
}

export interface TaskDetails {
    task_details_id: number;
    user_id: number;
    limit_date: Date | null;
    task_id: number;
    is_completed: boolean;
    created_at: Date;
}

export interface UsersHousing {
    user_id: number;
    housing_id: number;
    is_Admin: boolean;
    created_at: Date;
}

export interface AuthorizedUser {
    id: number;
    username: string;
}

export interface AuthorizedRequest extends Request {
    user: AuthorizedUser;
}
