import { IAuthService } from "../auth.service";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { User } from "@/models";

export class AuthServiceFirebaseImpl implements IAuthService{

    private user: User | null = null;

    constructor(){
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                this.user = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || null,
                    email: firebaseUser.email!,
                };
            } else {
                this.user = null;
            }
        });
    }

    async register(email: string, password: string): Promise<User> {
        let registerResponse = await createUserWithEmailAndPassword(auth, email, password);

        const newUser: User = {
            id: registerResponse.user.uid,
            name: null,
            email: registerResponse.user.email!
        };

        this.user = newUser;

        return this.user;
    }

    async login(email: string, password: string): Promise<User> {
        let loginResponse = await signInWithEmailAndPassword(auth, email, password);
        const newUser: User = {
            id: loginResponse.user.uid,
            name: null,
            email: loginResponse.user.email!
        };

        this.user = newUser;

        return this.user;
    }

    async logout(): Promise<void> {
        await signOut(auth).catch(console.log);
        this.user = null;
    }

    async getUserInfo(): Promise<User | null> {
        return this.user;
    }
}