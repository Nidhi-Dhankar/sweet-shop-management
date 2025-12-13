export declare const fetchSweets: () => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}[]>;
export declare const searchSweet: (query: any) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}[]>;
export declare const createSweet: (data: any) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}>;
export declare const modifySweet: (id: number, data: any) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}>;
export declare const removeSweet: (id: number) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}>;
//# sourceMappingURL=sweets.service.d.ts.map