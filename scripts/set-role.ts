/**
 * One-off script to update a user's role.
 * Usage: npx tsx scripts/set-role.ts <email> <role>
 * Example: npx tsx scripts/set-role.ts user@example.com OWNER
 */
import db from "../lib/db";

const validRoles = ["GUEST", "OCCUPANT", "OWNER", "AGENT", "ADMIN"] as const;

async function main(): Promise<void> {
  const [email, role] = process.argv.slice(2);

  if (!email || !role) {
    console.log("Usage: npx tsx scripts/set-role.ts <email> <role>");
    console.log(`Valid roles: ${validRoles.join(", ")}`);
    process.exit(1);
  }

  if (!validRoles.includes(role as (typeof validRoles)[number])) {
    console.error(`Invalid role "${role}". Valid roles: ${validRoles.join(", ")}`);
    process.exit(1);
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email "${email}"`);
    process.exit(1);
  }

  const updated = await db.user.update({
    where: { email },
    data: { role: role as (typeof validRoles)[number] },
  });

  console.log(`✅ Updated user "${updated.name}" (${updated.email}) → role: ${updated.role}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
