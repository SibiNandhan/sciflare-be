module.exports = {
  async up(db, client) {
    const users = await db
      .collection("users")
      .find({ name: { $regex: /\s/ } })
      .toArray();
    users.forEach(async (user) => {
      let name_length = user.name.split(" ").length;
      await db
        .collection("users")
        .updateOne(
          { _id: user._id },
          { $set: { lastName: user.name.split(" ")[name_length - 1] } }
        );
    });
  },

  async down(db, client) {
    const users_with_lastName = await db
      .collection("users")
      .find({ lastName: { $exists: true } })
      .toArray();
    users_with_lastName.forEach(async (user) => {
      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $unset: { lastName: 1 } });
    });
  },
};
