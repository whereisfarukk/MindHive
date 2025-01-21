// User, title,bio,proilePics,links{fb,twitter,github},post ,bookmarks
const { Schema, model } = require("mongoose");
const User = require("./User");
const Post = require("./Post");
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true, // whenever profile is created,it must has a user
    },
    title: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profilepic: String,
    link: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  { timestamps: true }
);
const Profile = model("Profile", profileSchema);
module.exports = Profile;
