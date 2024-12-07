import { User } from "@/models";

export interface IAuthService{
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<User>;
    logout(): Promise<void>;
    getUserInfo(): Promise<User | null>;
}