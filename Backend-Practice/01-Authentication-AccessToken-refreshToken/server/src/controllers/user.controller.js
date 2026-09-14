import userModel from "../models/UserModel.js";
import { generateTokens } from "../utils/auth.util.js";
/**
 *  @POST /api/auth/register
 */

export const authRegister = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      userName,
      email,
      passWordHash: password,
    });
    const { refreshToken, accessToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        userName,
        email,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error while creating user ", error.message);
    return res.status(500).json({
      message: `Internal server error ${error.message}`,
    });
  }
};
