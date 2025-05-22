"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "./prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResponse> => {
  if (!file) {
    throw new Error("No file found in form data");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "furnito/products",
          timeout: 60000, // 1 minute timeout
        },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            reject(new Error(error?.message || "Upload failed with no result"));
            return;
          }

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error preparing file for upload:", error);
    throw new Error(
      `Upload preparation failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const res = cloudinary.uploader.destroy(publicId, async (error, result) => {
      if (error) {
        throw error;
      }
      if (result.result === "ok") {
        removePublicIdAndUrlFromProductImages(publicId);
        removePublicIdAndUrlFromProductColors(publicId);
      }
      return result;
    });
    return res;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

const removePublicIdAndUrlFromProductImages = async (publicId: string) => {
  try {
    const productImage = await prisma.productImages.findFirst({
      where: { publicId: { has: publicId } },
      select: { id: true, publicId: true, url: true }, // Select the document ID url and publicId array
    });

    if (!productImage) {
      console.log("No matching document found.");
      return;
    }

    const updatedPublicIds = productImage.publicId.filter(
      (id) => id !== publicId
    );

    const updatedUrls = productImage.url.filter(
      (imageUrl) => !imageUrl.includes(publicId)
    );

    const updatedProductImage = await prisma.productImages.update({
      where: { id: productImage.id }, // Use found document's ID
      data: {
        publicId: { set: updatedPublicIds },
        url: { set: updatedUrls },
      },
    });

    console.log("Updated product:", updatedProductImage);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const removePublicIdAndUrlFromProductColors = async (publicId: string) => {
  try {
    const productColor = await prisma.colors.findFirst({
      where: { publicId },
    });

    if (!productColor) {
      console.log("No matching document found.");
      return;
    }

    await prisma.colors.delete({
      where: { id: productColor.id },
    });

    console.log("Updated product:", productColor);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
