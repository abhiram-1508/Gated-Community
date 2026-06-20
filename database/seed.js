// Seed entry point for Smart Community Management System.
// Extend this file with demo residents, units, facilities, notices, and admin users.

export async function seedDatabase() {
  console.log('Seed script placeholder: add MongoDB seed logic here.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
