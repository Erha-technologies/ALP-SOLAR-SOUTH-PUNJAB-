/**
 * Prisma seed script (Phase 2 deliverable).
 *
 * Seeds:
 *  - The 6 roles from spec §22 + a starter permission set
 *  - Product / FAQ / Blog categories (structure only — no invented product data)
 *  - Default `settings` rows: company info placeholders (§39/§53) and
 *    calculator assumptions (§52) so the app has something to read on first boot
 *  - One SUPER_ADMIN user so you can log in on day one
 *
 * Run with: `npx prisma db seed` (after `npx prisma migrate dev`).
 * Requires `bcryptjs` — add it to package.json (see docs/README.md).
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROLES = [
  { name: "SUPER_ADMIN", description: "Full system access" },
  { name: "ADMIN", description: "Business management access" },
  { name: "SALES", description: "Leads, customers, quotations, appointments" },
  { name: "INSTALLATION_MANAGER", description: "Projects, installations, appointments" },
  { name: "TECHNICIAN", description: "Assigned installations and maintenance" },
  { name: "CUSTOMER", description: "Own profile, quotations, projects, installation status" },
] as const;

// A starter permission set covering the entities in §22. Extend freely —
// this table is meant to grow without a schema change.
const PERMISSIONS = [
  "leads.view", "leads.create", "leads.update", "leads.delete", "leads.assign",
  "customers.view", "customers.create", "customers.update", "customers.delete",
  "quotations.view", "quotations.create", "quotations.update", "quotations.delete",
  "appointments.view", "appointments.create", "appointments.update", "appointments.delete",
  "projects.view", "projects.create", "projects.update", "projects.delete",
  "installations.view", "installations.create", "installations.update",
  "products.view", "products.manage",
  "packages.view", "packages.manage",
  "testimonials.manage",
  "blog.manage",
  "faq.manage",
  "service_areas.manage",
  "users.manage",
  "settings.manage",
  "audit_log.view",
];

// role -> permission key prefixes it should receive by default
const ROLE_PERMISSION_MAP: Record<string, string[]> = {
  SUPER_ADMIN: PERMISSIONS, // everything
  ADMIN: PERMISSIONS.filter((p) => p !== "users.manage"), // business mgmt, not user mgmt
  SALES: PERMISSIONS.filter((p) =>
    ["leads.", "customers.", "quotations.", "appointments."].some((prefix) => p.startsWith(prefix))
  ),
  INSTALLATION_MANAGER: PERMISSIONS.filter((p) =>
    ["projects.", "installations.", "appointments."].some((prefix) => p.startsWith(prefix))
  ),
  TECHNICIAN: ["installations.view", "installations.update", "projects.view"],
  CUSTOMER: [], // customers act on their own records via ownership checks, not role permissions
};

async function seedRolesAndPermissions() {
  const roleRecords = new Map<string, number>();
  for (const role of ROLES) {
    const record = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
    roleRecords.set(role.name, record.id);
  }

  const permissionRecords = new Map<string, number>();
  for (const key of PERMISSIONS) {
    const record = await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key },
    });
    permissionRecords.set(key, record.id);
  }

  for (const [roleName, permissionKeys] of Object.entries(ROLE_PERMISSION_MAP)) {
    const roleId = roleRecords.get(roleName)!;
    for (const key of permissionKeys) {
      const permissionId = permissionRecords.get(key);
      if (!permissionId) continue;
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId } },
        update: {},
        create: { roleId, permissionId },
      });
    }
  }

  return roleRecords;
}

async function seedSuperAdmin(roleRecords: Map<string, number>) {
  // CHANGE THIS PASSWORD before running against anything but local dev.
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@erhatechnologies.com" },
    update: {},
    create: {
      email: "admin@erhatechnologies.com",
      fullName: "Super Admin",
      passwordHash,
      isActive: true,
    },
  });

  const superAdminRoleId = roleRecords.get("SUPER_ADMIN")!;
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: superAdminRoleId } },
    update: {},
    create: { userId: admin.id, roleId: superAdminRoleId },
  });
}

async function seedProductCategories() {
  const categories = [
    { name: "Solar Panels", slug: "solar-panels" },
    { name: "Inverters", slug: "inverters" },
    { name: "Batteries", slug: "batteries" },
    { name: "Mounting Structures", slug: "mounting-structures" },
    { name: "Cables", slug: "cables" },
    { name: "Protection Devices", slug: "protection" },
    { name: "Accessories", slug: "accessories" },
  ];
  for (const [index, category] of categories.entries()) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: { ...category, displayOrder: index },
    });
  }
}

async function seedFaqCategories() {
  const categories = [
    "Solar Basics", "Pricing", "Installation", "Batteries", "Net Metering", "Maintenance", "Warranty",
  ];
  for (const [index, name] of categories.entries()) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    await prisma.faqCategory.upsert({
      where: { slug },
      update: {},
      create: { name, slug, displayOrder: index },
    });
  }
}

async function seedBlogCategories() {
  const categories = ["Solar Guides", "Company News", "Case Studies", "Net Metering & Policy"];
  for (const name of categories) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.blogCategory.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }
}

async function seedSettings() {
  // Placeholders only — per §39, never invent real company facts.
  // Replace values via the admin Settings screen once real data exists.
  const settings: { key: string; value: string; group: string }[] = [
    { key: "company.name", value: "[COMPANY NAME]", group: "company" },
    { key: "company.phone", value: "[PHONE NUMBER]", group: "company" },
    { key: "company.whatsapp", value: "[WHATSAPP NUMBER]", group: "company" },
    { key: "company.email", value: "[COMPANY EMAIL]", group: "company" },
    { key: "company.address", value: "[OFFICE ADDRESS]", group: "company" },
    { key: "company.google_maps_url", value: "[GOOGLE MAPS URL]", group: "company" },
    { key: "seo.default_title", value: "[DEFAULT SEO TITLE]", group: "seo" },
    { key: "seo.default_description", value: "[DEFAULT SEO DESCRIPTION]", group: "seo" },
    // Calculator assumptions (§52) — configurable, not hard-coded in app code.
    { key: "calculator.peak_sun_hours", value: "5.5", group: "calculator" },
    { key: "calculator.panel_wattage_default", value: "580", group: "calculator" },
    { key: "calculator.system_losses_percent", value: "15", group: "calculator" },
    { key: "calculator.inverter_efficiency_percent", value: "97", group: "calculator" },
    { key: "calculator.battery_efficiency_percent", value: "90", group: "calculator" },
    { key: "calculator.tariff_pkr_per_unit", value: "[CURRENT TARIFF PLACEHOLDER]", group: "calculator" },
    {
      key: "calculator.disclaimer",
      value:
        "Final system sizing and savings depend on site conditions, electricity tariff, shading, equipment selection, and professional site assessment.",
      group: "calculator",
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
}

async function main() {
  const roleRecords = await seedRolesAndPermissions();
  await seedSuperAdmin(roleRecords);
  await seedProductCategories();
  await seedFaqCategories();
  await seedBlogCategories();
  await seedSettings();
  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
