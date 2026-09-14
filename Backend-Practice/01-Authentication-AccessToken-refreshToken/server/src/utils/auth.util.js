import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_SECRET, {
    expiresIn: config.ACCESS_SECRET_EXPIRE,
  });
  const refreshToken = jwt.sign({ id: userId }, config.REFRESH_SECRET, {
    expiresIn: config.REFRESH_SECRET_EXPIRE,
  });
  return { accessToken, refreshToken };
};


export const verifyAccessToken=(token)=>{
    const decoded=jwt.verify(token,config.ACCESS_SECRET)
    return decoded
}
export const verifyRefreshToken=(token)=>{
    const decoded=jwt.verify(token,config.REFRESH_SECRET)
    return decoded
}