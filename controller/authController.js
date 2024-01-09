const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/jwt");
const OrganizationModel = require("../model/OrganizationModel");
const { default: mongoose } = require("mongoose");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      const error = new Error("Invalid Credentials");
      error.status = 400;
      throw error;
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      const error = new Error("Invalid Credentials");
      error.status = 400;
      throw error;
    }
    const jwt = createJWT({ id: user._id });
    res.json({ token: jwt });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password, orgId, name } = req.body;
    //check if email exists
    const user = await UserModel.findOne({ email });
    if (user) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error;
    }
    await UserModel.create({ email, password, orgId, name });
    res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin == false) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.createAdminWithOrganization = async (req, res, next) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const { email, password, name, orgName, orgAddress, orgEmail, orgPhoneNo } =
      req.body;
    //check if user email exists

    const user = await UserModel.findOne({ email });
    if (user) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error;
    }
    //check if org exists
    const org = await OrganizationModel.findOne({ email: orgEmail });
    if (org) {
      const error = new Error("Organization Email already exists");
      error.status = 400;
      throw error;
    }

    const create_org = await OrganizationModel.create(
      [
        {
          name: orgName,
          email: orgEmail,
          organization_address: orgAddress,
          phone_no: orgPhoneNo,
        },
      ],
      { session }
    );
    await UserModel.create(
      [
        {
          email,
          password,
          name,
          isAdmin: true,
          orgId: create_org[0]._id,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    res.json({ message: "success" });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
};
