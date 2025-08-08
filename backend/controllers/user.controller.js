import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const Token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    user.Token = Token;
    await user.save({ validateBeforeSave: false });

    // console.log("Generated Token:", Token);
    return { Token };
  } catch (error) {
    console.error("Error generating token:", error);
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, mobno, emailid, password } = req.body;
  if ([name, mobno, emailid, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const ExistedUser = await User.findOne({
    $or: [{ emailid }],
  });
  if (ExistedUser) {
    throw new ApiError(409, "User with this email already exists");
  }
  const user = await User.create({
    name,
    mobno,
    emailid,
    password,
  });
  const createdUser = await User.findById(user._id).select("-Token");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong during user registration");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailid, password } = req.body;

  if (!emailid || !password) {
    throw new ApiError(400, "Email and Password both are required");
  }

  const user = await User.findOne({ emailid });
  if (!user) {
    return res
      .status(200)
      .json(new ApiResponse(200, { emailid }, "User does not exist"));
  }
  const auth = bcrypt.compare(password, user.password);

  if (!auth) {
    return res
      .status(200)
      .json(new ApiResponse(200, { emailid }, "Incorrect Email or Password"));
  }
  const { Token } = await generateTokens(user._id);

  return res
    .status(200)
    .json(new ApiResponse(201, { user, Token }, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        Token: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    // httpOnly : true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("Token", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"));
});

const getcurUserdetails = asyncHandler(async (req, res) => {
  const curUser = await User.findById(req.user._id).select("-Token");
  if (!curUser) {
    throw new ApiError(500, "Could not fetch Users data!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, curUser, "Fetched Successfully"));
});
const getUserbyID = asyncHandler(async (req, res) => {
  const curUser = await User.findById(req.params.UserID).select("-Token");
  if (!curUser) {
    throw new ApiError(500, "Could not fetch Users data!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, curUser, "Fetched Successfully"));
});

const verifyToken = asyncHandler(async (req, res) => {
  try {
    let incomingRefreshToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      incomingRefreshToken = req.headers.authorization.split(" ")[1];
    } else incomingRefreshToken = req.cookies?.Token;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request");
    }
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken.id);

    if (!user.name) {
      throw new ApiError(401, "Invalid Token");
    }
    const { Token: newToken } = await generateTokens(user._id);
    const loggeduser = await User.findById(decodedRefreshToken.id);
    const options = {
      // httpOnly : true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("Token", newToken, options)
      .json(
        new ApiResponse(
          200,
          {
            Token: newToken,
            user: loggeduser,
          },
          "Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid token ");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = (req.user._id).toString();

  const { name, emailid, mobno } = req.body;


  // Prepare fields to update
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (emailid !== undefined) updateFields.emailid = emailid;
  if (mobno !== undefined) updateFields.mobno = mobno;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  }).select("-Token");

  const { Token } = await generateTokens(updatedUser._id);

  if (!updatedUser) {
    throw new ApiError(500, "User update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {user:updatedUser,Token} , "User updated successfully"));
});


export {
  registerUser,
  getcurUserdetails,
  getUserbyID,
  loginUser,
  logoutUser,
  verifyToken,
  updateUser,
};
