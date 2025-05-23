import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return Response.json(new ApiError(401, false, "Unauthorized"));
    }

    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
    });

    if (!user) {
      return Response.json(new ApiError(404, false, "User not found"));
    }

    return Response.json(
      new ApiResponse(200, true, user, "User data fetched successfully")
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return Response.json(new ApiError(401, false, "Error fetching user data"));
  }
}
