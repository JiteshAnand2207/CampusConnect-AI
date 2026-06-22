import ApiResponse from "./apiResponse.js";

const sendToken = (user, statusCode, res, message) => {
  const token = user.generateAccessToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(statusCode)
    .cookie("accessToken", token, cookieOptions)
    .json(
      new ApiResponse(
        statusCode,
        {
          user,
          token,
        },
        message
      )
    );
};

export default sendToken;