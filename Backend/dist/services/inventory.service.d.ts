export declare const decreaseStock: (id: number) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}>;
export declare const increaseStock: (id: number, quantity: number) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
}>;
//# sourceMappingURL=inventory.service.d.ts.map