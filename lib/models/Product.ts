import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVariant {
  name: string;
  price: number;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  variants?: IVariant[];
  stock: number;
  tags: string[];
  featured: boolean;
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    images: {
      type: [String],
      required: [true, "Please provide at least one image"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Vapes", "Vaporizers", "Gummies"],
    },
    subcategory: {
      type: String,
      required: [true, "Please provide a subcategory"],
    },
    variants: [VariantSchema],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });
ProductSchema.index({ category: 1, subcategory: 1 });
ProductSchema.index({ featured: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

