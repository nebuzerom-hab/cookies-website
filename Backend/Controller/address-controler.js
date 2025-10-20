const { StatusCodes } = require("http-status-codes");
const addressService = require("../Service/address-service");

// Create a new address
async function createAddress(req, res) {
  try {
    console.log("Request body:", req.body);

    if (!req.body) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Request body is missing" });
    }

    const {
      order_id,
      first_name,
      last_name,
      phone,
      email,
      address,
      address_2,
      city,
      state,
      zip_code,
      shipping_option,
    } = req.body;

    // ✅ Validation
    if (
      !order_id ||
      !first_name ||
      !last_name ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zip_code
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "All required fields must be provided" });
    }

    const newAddress = await addressService.createAddress(req.body);

    return res.status(StatusCodes.CREATED).json({
      msg: "Address created successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Address creation error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
}

// Get addresses → user sees own, admin sees all
async function getAddresses(req, res) {
  try {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Login required" });
    }

    const { user_id, user_role } = req.user;

    let addresses;
    if (Number(user_role) === 4) {
      // Admin → can see ALL addresses
      addresses = await addressService.getAllAddresses();
    } else {
      // Regular user → see only their own addresses
      addresses = await addressService.getAddressesByUser(user_id);
    }

    return res.status(StatusCodes.OK).json({ addresses });
  } catch (error) {
    console.error("Get addresses error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
}

module.exports = { createAddress, getAddresses };
