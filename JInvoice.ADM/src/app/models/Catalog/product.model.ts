export interface Product {
    productID: number;
    categoryID: number;
    name: string;
    description: string;
    price: number;
    onHand: number;
    createdBy: string;
    isActive: boolean;
    createdOn: Date;
    imageCoverName? : string;
    imageCoverPath? : string;
    }