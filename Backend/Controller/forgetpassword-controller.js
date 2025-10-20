const { StatusCodes } = require("http-status-codes");
const forgetPasswordService = require("../Service/forget-password-service");

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    // ✅ Validate input
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email is required" });
    }

    // ✅ Call service
    const result = await forgetPasswordService.createResetToken(email);

    return res.status(StatusCodes.OK).json({
      msg: "Password reset token created. Check your email (simulated).",
      token: result.token, // In real app, you’d email it
    });
  } catch (error) {
    console.error("Forget password error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
}

module.exports = { requestPasswordReset };
