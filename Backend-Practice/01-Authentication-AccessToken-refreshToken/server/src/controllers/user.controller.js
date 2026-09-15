import userModel from "../models/UserModel.js";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.util.js";
/**
 *  @POST /api/auth/register
 */

export const authRegister = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userExists = await userModel.findOne({ userName });
    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      userName,
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
        id: user._id,
        userName,
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

/**
 * @POST /api/auth/login
 */
export const authLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.findOne({ userName });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (password === user.password)
      return res.status(404).json({ message: "Incorrect password " });
    const { accessToken, refreshToken } = generateTokens(user._id);
    res.cookie("refreshToken", refreshToken);
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(200).json({
      message: "login successful ",
      data: {
        userName,
      },
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `error while login ${error.message}` });
  }
};
/**
 * @GET /api/auth/me
 */
export const getMe = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }
  try {
    const decoded = verifyAccessToken(token);
    const user = await userModel.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    return res.status(200).json({
      message: "found successfully",
      data: {
        userName: user.userName,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: `error in getting profile ${error.message}`,
    });
  }
};

export const refreshUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(400).json({ message: "token not found" });

  try {
    const decoded = verifyRefreshToken(token);
    const user = await userModel.findOne({ _id: decoded.id });
    if (token !== user.refreshToken) {
      ((user.refreshToken = null), await user.save());
      return res.status(400).json({ message: "token mismatch login again " });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id,
    );
    res.cookie("refreshToken", newRefreshToken);
    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .json({ message: "token refreshed successfully", accessToken });
  } catch (error) {
    return res.status(500).json({
      message: `error in token refreshing ${error.message}`,
    });
  }
};
