import { Document } from "mongoose";

export class UserEntity extends Document {
    public name!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public tasks!: [];
}