import { Document } from "mongoose";

export class TaskEntity extends Document {
  public description!: string;
  public done?: boolean;
}
