interface AuthInput {
    name?: string;
    email: string;
    password: string;
}
export declare const registerUser: ({ name, email, password }: AuthInput) => Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        isAdmin: boolean;
    };
}>;
export declare const loginUser: ({ email, password }: AuthInput) => Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        isAdmin: boolean;
    };
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map