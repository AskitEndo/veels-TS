import mongoose, { Schema, model, models } from "mongoose";
import brcrypt from "bcryptjs";

export const VIDEO_DIMENSIONS = {
  width: 1080,

  height: 720,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    controls: { type: Boolean, deafult: true },
    transformation: {
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await brcrypt.hash(this.password, 10);
//   }
//   next();
// });

const Video = models?.Video || model<IVideo>("User", videoSchema);

export default Video;
