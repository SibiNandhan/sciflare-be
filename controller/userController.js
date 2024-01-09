const UserModel = require("../model/UserModel");
const { createRandomUser } = require("../utils/faker");

exports.getUsers = async (req, res, next) => {
  try {
    let where = { orgId: req.user.orgId };
    const skip = req.query.skip ?? 0;
    const limit = req.query.limit ?? 10;
    if (!req.user.isAdmin) {
      where._id = req.user._id;
    }
    function getUserCount() {
      return UserModel.find(where).countDocuments();
    }
    function getUserDate() {
      return UserModel.find(where).select("-password").skip(skip).limit(limit);
    }
    const [data, count] = await Promise.all([getUserDate(), getUserCount()]);
    res.json({ data, count });
  } catch (err) {
    next(err);
  }
};

exports.insertFakeUser = async (req, res, next) => {
  try {
    const count = req.query.count ?? 10;
    const orgId = req.query.orgId;
    const password = req.query.password ?? "password";
    const isAdmin = req.query.isAdmin ?? false;
    if (!orgId) {
      throw new Error("Organization id is required");
    }
    let users = [];
    for (let i = 0; i < count; i++) {
      users.push(createRandomUser(orgId, password, isAdmin));
    }
    await UserModel.insertMany(users);
    res.json({ message: "success", users });
  } catch (err) {
    next(err);
  }
};
