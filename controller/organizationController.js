const OrganizationModel = require("../model/OrganizationModel");

exports.createOrganization = async (req, res, next) => {
  try {
    const { name, email, organization_address, phone_no } = req.body;

    //check with name and email if org exists

    const find_org = await OrganizationModel.findOne({ name, email });

    if (find_org) {
      const error = new Error("Name or Email already exists");
      error.status = 400;
      throw error;
    }

    const org = await OrganizationModel.create({
      name,
      email,
      organization_address,
      phone_no,
    });
    res.status(201).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getOrganization = async (req, res, next) => {
  try {
    const org = await OrganizationModel.find().select("_id name");
    res.json(org);
  } catch (err) {
    next(err);
  }
};

exports.getUserOrganization = async (req, res, next) => {
  try {
    const userOrgId = req.user.orgId;
    const org = await OrganizationModel.findById(userOrgId);
    res.json(org);
  } catch (err) {
    next(err);
  }
};
