import db from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    const user=  await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getUserById(id: string) {
  try {
    const user=  await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
}

