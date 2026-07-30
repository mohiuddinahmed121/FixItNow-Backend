import { ICreateCategory } from "./category.interface";
declare const createCategory: (payload: ICreateCategory) => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllCategories: () => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const categoryService: {
    createCategory: typeof createCategory;
    getAllCategories: typeof getAllCategories;
};
export {};
//# sourceMappingURL=category.service.d.ts.map