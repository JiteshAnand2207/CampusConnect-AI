import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const uploadToCloudinary = async (filePath, folder = "campusconnect-ai") => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });

  fs.unlink(filePath, (error) => {
    if (error) {
      console.error("Local temp file cleanup failed:", error.message);
    }
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
  };
};

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const uploaded = await uploadToCloudinary(req.file.path);

  const fileData = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: uploaded.url,
    publicId: uploaded.publicId,
    resourceType: uploaded.resourceType,
    format: uploaded.format,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, fileData, "File uploaded successfully"));
});

export const uploadSingleFile = uploadFile;

export const uploadMultipleFiles = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one file is required",
    });
  }

  const files = await Promise.all(
    req.files.map(async (file) => {
      const uploaded = await uploadToCloudinary(file.path);

      return {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        mimetype: file.mimetype,
        size: file.size,
        url: uploaded.url,
        publicId: uploaded.publicId,
        resourceType: uploaded.resourceType,
        format: uploaded.format,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, files, "Files uploaded successfully"));
});