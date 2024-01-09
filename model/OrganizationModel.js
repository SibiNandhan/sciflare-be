const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    organization_address: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

const OrganizationModel = mongoose.model("Organization", OrganizationSchema);

module.exports = OrganizationModel;
