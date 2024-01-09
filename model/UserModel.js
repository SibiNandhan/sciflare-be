const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    orgId: {
      type: mongoose.Types.ObjectId,
      ref: "Organization",
    },
    lastName: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
