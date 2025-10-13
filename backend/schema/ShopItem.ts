import mongoose, { Model, Document } from "mongoose";

interface ShopItemDoc extends Document {
    name: string;
    price: number,
    category: string
}

const ShopItemSchema = new mongoose.Schema<ShopItemDoc>({
    name: String,
    price: Number,
    category: String,
});

export const ShopItem: Model<ShopItemDoc> = mongoose.model<ShopItemDoc>('ShopItem', ShopItemSchema);