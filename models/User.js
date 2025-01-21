// name ,email,password ,profile
const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
      // Reference to the User schema
      type: Schema.Types.ObjectId,
      ref: "Profile", // it points to the Profile model

      // we are not making it required cause a profile can't be created before creating User
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
