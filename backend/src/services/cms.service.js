import { models, sequelize } from "../config/database.js";
import { AppError } from "../utils/AppError.js";
import { serializePage, serializeSection, serializeItem } from "../utils/serializeCms.js";
import { slugify } from "../utils/slugify.js";
import {
  seedVersion,
  getSeedPageByKey,
  getSeedResourceBySlug,
  cmsSeedPages,
} from "../../../shared/cms/index.js";

const PRODUCT_NAMESPACES = new Set(["hrms", "bulk-email", "asset-management"]);

function normalizeProductNamespace(product) {
  return PRODUCT_NAMESPACES.has(product) ? product : null;
}

export function pageKeyBelongsToProduct(pageKey, product) {
  const namespace = normalizeProductNamespace(product);

  if (!namespace) {
    return true;
  }

  const normalizedPageKey = String(pageKey ?? "");

  if (namespace === "bulk-email") {
    return normalizedPageKey.startsWith("bulk-email");
  }

  if (namespace === "asset-management") {
    return normalizedPageKey.startsWith("asset-management");
  }

  return !normalizedPageKey.startsWith("bulk-email") && !normalizedPageKey.startsWith("asset-management");
}

const pageInclude = [
  {
    model: models.PageSection,
    as: "sections",
    include: [{ model: models.SectionItem, as: "items" }],
  },
  { model: models.ResourcePage, as: "resourcePage" },
];

async function ensureAllSeedPagesExist() {
  const existingPages = await models.Page.findAll({
    attributes: ["page_key"],
  });
  const existingKeys = new Set(existingPages.map((page) => page.page_key));

  for (const seedPage of cmsSeedPages) {
    if (!existingKeys.has(seedPage.pageKey)) {
      await upsertSeedPage(seedPage);
      existingKeys.add(seedPage.pageKey);
    }
  }
}

async function ensureSeedPageExists(pageKey) {
  const existingPage = await models.Page.findOne({
    where: { page_key: pageKey },
    attributes: ["id"],
  });

  if (existingPage) {
    return;
  }

  const seedPage = getSeedPageByKey(pageKey);

  if (seedPage) {
    await upsertSeedPage(seedPage);
  }
}

async function ensureSeedSections(page) {
  const seedPage = getSeedPageByKey(page.page_key);

  if (!seedPage) {
    return page;
  }

  const existingKeys = new Set((page.sections ?? []).map((section) => section.section_key));
  const missingSections = seedPage.sections.filter((section) => !existingKeys.has(section.sectionKey));

  if (!missingSections.length) {
    return page;
  }

  for (const [sectionIndex, seedSection] of missingSections.entries()) {
    const createdSection = await models.PageSection.create({
      page_id: page.id,
      section_key: seedSection.sectionKey,
      section_type: seedSection.sectionType,
      internal_name: seedSection.internalName,
      heading: seedSection.heading ?? null,
      subheading: seedSection.subheading ?? null,
      description: seedSection.description ?? null,
      image_url: seedSection.imageUrl ?? null,
      image_alt: seedSection.imageAlt ?? null,
      background_image_url: seedSection.backgroundImageUrl ?? null,
      background_image_alt: seedSection.backgroundImageAlt ?? null,
      button_text: seedSection.buttonText ?? null,
      button_link: seedSection.buttonLink ?? null,
      settings_json: seedSection.settings ?? {},
      display_order: seedSection.displayOrder ?? page.sections.length + sectionIndex,
      is_active: seedSection.isActive ?? true,
      is_required: seedSection.isRequired ?? false,
    });

    for (const [itemIndex, seedItem] of (seedSection.items ?? []).entries()) {
      await models.SectionItem.create({
        section_id: createdSection.id,
        item_type: seedItem.itemType,
        title: seedItem.title ?? null,
        subtitle: seedItem.subtitle ?? null,
        description: seedItem.description ?? null,
        icon: seedItem.icon ?? null,
        image_url: seedItem.imageUrl ?? null,
        image_alt: seedItem.imageAlt ?? null,
        button_text: seedItem.buttonText ?? null,
        button_link: seedItem.buttonLink ?? null,
        extra_data_json: seedItem.extraData ?? {},
        display_order: seedItem.displayOrder ?? itemIndex,
        is_active: seedItem.isActive ?? true,
      });
    }
  }

  return models.Page.findByPk(page.id, { include: pageInclude });
}

function normalizeSectionInput(payload = {}) {
  return {
    section_key: payload.sectionKey,
    section_type: payload.sectionType,
    internal_name: payload.internalName,
    heading: payload.heading ?? null,
    subheading: payload.subheading ?? null,
    description: payload.description ?? null,
    image_url: payload.imageUrl ?? null,
    image_alt: payload.imageAlt ?? null,
    background_image_url: payload.backgroundImageUrl ?? null,
    background_image_alt: payload.backgroundImageAlt ?? null,
    button_text: payload.buttonText ?? null,
    button_link: payload.buttonLink ?? null,
    settings_json: payload.settings ?? {},
    display_order: payload.displayOrder ?? 0,
    is_active: payload.isActive ?? true,
    is_required: payload.isRequired ?? false,
  };
}

function normalizeItemInput(payload = {}) {
  return {
    item_type: payload.itemType,
    title: payload.title ?? null,
    subtitle: payload.subtitle ?? null,
    description: payload.description ?? null,
    icon: payload.icon ?? null,
    image_url: payload.imageUrl ?? null,
    image_alt: payload.imageAlt ?? null,
    button_text: payload.buttonText ?? null,
    button_link: payload.buttonLink ?? null,
    extra_data_json: payload.extraData ?? {},
    display_order: payload.displayOrder ?? 0,
    is_active: payload.isActive ?? true,
  };
}

export async function listAdminPages() {
  await ensureAllSeedPagesExist();

  const pages = await models.Page.findAll({
    include: [{ model: models.ResourcePage, as: "resourcePage" }],
    order: [
      ["page_name", "ASC"],
      [{ model: models.ResourcePage, as: "resourcePage" }, "display_order", "ASC"],
    ],
  });

  return pages.map((page) => ({
    id: page.id,
    pageKey: page.page_key,
    pageName: page.page_name,
    slug: page.slug,
    metaTitle: page.meta_title,
    status: page.status,
    resourcePage: page.resourcePage
      ? {
          id: page.resourcePage.id,
          resourceName: page.resourcePage.resource_name,
          slug: page.resourcePage.slug,
          status: page.resourcePage.status,
          displayOrder: page.resourcePage.display_order,
        }
      : null,
  }));
}

export async function getPageById(id) {
  let page = null;

  if (typeof id === "number" || /^\d+$/.test(String(id))) {
    page = await models.Page.findByPk(Number(id), {
      include: pageInclude,
    });
  }

  if (!page && typeof id === "string") {
    await ensureSeedPageExists(id);

    page = await models.Page.findOne({
      where: { page_key: id },
      include: pageInclude,
    });
  }

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  return ensureSeedSections(page);
}

export async function getPageByKey(pageKey, { publishedOnly = false } = {}) {
  await ensureSeedPageExists(pageKey);

  const page = await models.Page.findOne({
    where: {
      page_key: pageKey,
      ...(publishedOnly ? { status: "published" } : {}),
    },
    include: pageInclude,
  });

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  return ensureSeedSections(page);
}

export async function getPageBySlug(slug, { publishedOnly = false, product = null } = {}) {
  const resource = await models.ResourcePage.findOne({
    where: {
      slug,
      ...(publishedOnly ? { status: "published" } : {}),
    },
    include: [
      {
        model: models.Page,
        as: "page",
        include: pageInclude,
      },
    ],
  });

  if (!resource?.page || !pageKeyBelongsToProduct(resource.page.page_key, product)) {
    throw new AppError("Resource page not found", 404);
  }

  return ensureSeedSections(resource.page);
}

export async function listResources({ publishedOnly = false, product = null } = {}) {
  const resources = await models.ResourcePage.findAll({
    where: publishedOnly ? { status: "published" } : {},
    include: [
      {
        model: models.Page,
        as: "page",
      },
    ],
    order: [["display_order", "ASC"]],
  });

  return resources
    .filter((resource) => pageKeyBelongsToProduct(resource.page?.page_key, product))
    .map((resource) => ({
    id: resource.id,
    resourceName: resource.resource_name,
    slug: resource.slug,
    shortDescription: resource.short_description,
    featuredImage: resource.featured_image,
    featuredImageAlt: resource.featured_image_alt,
    status: resource.status,
    displayOrder: resource.display_order,
    page: resource.page
      ? {
          id: resource.page.id,
          pageKey: resource.page.page_key,
          pageName: resource.page.page_name,
          metaTitle: resource.page.meta_title,
        }
      : null,
    }));
}

export async function updatePage(id, payload) {
  const page = await getPageById(id);

  await page.update({
    page_name: payload.pageName,
    slug: payload.slug,
    meta_title: payload.metaTitle ?? null,
    meta_description: payload.metaDescription ?? null,
    meta_keywords: payload.metaKeywords ?? null,
    canonical_url: payload.canonicalUrl ?? null,
    og_title: payload.ogTitle ?? null,
    og_description: payload.ogDescription ?? null,
    og_image: payload.ogImage ?? null,
    og_image_alt: payload.ogImageAlt ?? null,
    indexable: payload.indexable ?? true,
    status: payload.status ?? page.status,
  });

  return serializePage(await getPageById(id));
}

export async function createSection(pageId, payload) {
  const page = await getPageById(pageId);

  const section = await models.PageSection.create({
    page_id: page.id,
    ...normalizeSectionInput(payload),
  });

  return serializeSection(section);
}

export async function updateSection(id, payload) {
  const section = await models.PageSection.findByPk(id, {
    include: [{ model: models.SectionItem, as: "items" }],
  });

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  await section.update(normalizeSectionInput(payload));

  return serializeSection(await models.PageSection.findByPk(id, {
    include: [{ model: models.SectionItem, as: "items" }],
  }));
}

export async function getSectionById(id) {
  const section = await models.PageSection.findByPk(id, {
    include: [{ model: models.SectionItem, as: "items" }],
  });

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  return section;
}

export async function deleteSection(id) {
  const section = await models.PageSection.findByPk(id);

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  if (section.is_required) {
    throw new AppError("This section is required and cannot be deleted", 400);
  }

  await section.destroy();
}

export async function reorderSections(items) {
  await Promise.all(
    items.map((entry, index) =>
      models.PageSection.update(
        { display_order: entry.displayOrder ?? index },
        { where: { id: entry.id } },
      ),
    ),
  );
}

export async function createSectionItem(sectionId, payload) {
  const section = await models.PageSection.findByPk(sectionId);

  if (!section) {
    throw new AppError("Section not found", 404);
  }

  const item = await models.SectionItem.create({
    section_id: sectionId,
    ...normalizeItemInput(payload),
  });

  return serializeItem(item);
}

export async function updateSectionItem(id, payload) {
  const item = await models.SectionItem.findByPk(id);

  if (!item) {
    throw new AppError("Section item not found", 404);
  }

  await item.update(normalizeItemInput(payload));

  return serializeItem(item);
}

export async function deleteSectionItem(id) {
  const item = await models.SectionItem.findByPk(id);

  if (!item) {
    throw new AppError("Section item not found", 404);
  }

  await item.destroy();
}

export async function reorderSectionItems(items) {
  await Promise.all(
    items.map((entry, index) =>
      models.SectionItem.update(
        { display_order: entry.displayOrder ?? index },
        { where: { id: entry.id } },
      ),
    ),
  );
}

export async function createResource(payload) {
  const page = await models.Page.create({
    page_key: payload.pageKey ?? slugify(payload.pageName),
    page_name: payload.pageName,
    slug: payload.slug,
    meta_title: payload.metaTitle ?? payload.pageName,
    meta_description: payload.metaDescription ?? null,
    meta_keywords: payload.metaKeywords ?? null,
    canonical_url: payload.canonicalUrl ?? null,
    og_title: payload.ogTitle ?? null,
    og_description: payload.ogDescription ?? null,
    og_image: payload.ogImage ?? null,
    og_image_alt: payload.ogImageAlt ?? null,
    indexable: payload.indexable ?? true,
    status: payload.status ?? "draft",
    seed_version: seedVersion,
  });

  const resource = await models.ResourcePage.create({
    page_id: page.id,
    resource_name: payload.resourceName ?? payload.pageName,
    slug: payload.slug,
    short_description: payload.shortDescription ?? null,
    featured_image: payload.featuredImage ?? null,
    featured_image_alt: payload.featuredImageAlt ?? null,
    status: payload.status ?? "draft",
    display_order: payload.displayOrder ?? 0,
  });

  return { page, resource };
}

export async function updateResource(id, payload) {
  const resource = await models.ResourcePage.findByPk(id, {
    include: [{ model: models.Page, as: "page" }],
  });

  if (!resource?.page) {
    throw new AppError("Resource page not found", 404);
  }

  await resource.page.update({
    page_name: payload.pageName ?? resource.page.page_name,
    slug: payload.slug ?? resource.page.slug,
    meta_title: payload.metaTitle ?? resource.page.meta_title,
    meta_description: payload.metaDescription ?? resource.page.meta_description,
    meta_keywords: payload.metaKeywords ?? resource.page.meta_keywords,
    canonical_url: payload.canonicalUrl ?? resource.page.canonical_url,
    og_title: payload.ogTitle ?? resource.page.og_title,
    og_description: payload.ogDescription ?? resource.page.og_description,
    og_image: payload.ogImage ?? resource.page.og_image,
    og_image_alt: payload.ogImageAlt ?? resource.page.og_image_alt,
    indexable: payload.indexable ?? resource.page.indexable,
    status: payload.status ?? resource.page.status,
  });

  await resource.update({
    resource_name: payload.resourceName ?? resource.resource_name,
    slug: payload.slug ?? resource.slug,
    short_description: payload.shortDescription ?? resource.short_description,
    featured_image: payload.featuredImage ?? resource.featured_image,
    featured_image_alt: payload.featuredImageAlt ?? resource.featured_image_alt,
    status: payload.status ?? resource.status,
    display_order: payload.displayOrder ?? resource.display_order,
  });

  return resource.reload({ include: [{ model: models.Page, as: "page" }] });
}

export async function deleteResource(id) {
  const resource = await models.ResourcePage.findByPk(id, {
    include: [{ model: models.Page, as: "page" }],
  });

  if (!resource?.page) {
    throw new AppError("Resource page not found", 404);
  }

  await resource.destroy();
  await resource.page.destroy();
}

export async function reorderResources(items) {
  await Promise.all(
    items.map((entry, index) =>
      models.ResourcePage.update(
        { display_order: entry.displayOrder ?? index },
        { where: { id: entry.id } },
      ),
    ),
  );
}

export async function restorePageFromSeed(pageId) {
  const page = await getPageById(pageId);
  const seedPage = getSeedPageByKey(page.page_key) ?? getSeedResourceBySlug(page.slug);

  if (!seedPage) {
    throw new AppError("No seed data is available for this page", 404);
  }

  await upsertSeedPage(seedPage);
  return serializePage(await getPageByKey(seedPage.pageKey));
}

export async function upsertSeedPage(seedPage) {
  return sequelize.transaction(async (transaction) => {
    const [page] = await models.Page.findOrCreate({
      where: { page_key: seedPage.pageKey },
      defaults: {
        page_key: seedPage.pageKey,
        page_name: seedPage.pageName,
        slug: seedPage.slug,
        meta_title: seedPage.meta.title,
        meta_description: seedPage.meta.description,
        meta_keywords: seedPage.meta.keywords?.join(", ") ?? null,
        canonical_url: seedPage.meta.canonicalUrl ?? null,
        og_title: seedPage.meta.ogTitle ?? null,
        og_description: seedPage.meta.ogDescription ?? null,
        og_image: seedPage.meta.ogImage ?? null,
        og_image_alt: seedPage.meta.ogImageAlt ?? null,
        indexable: seedPage.meta.indexable ?? true,
        status: seedPage.status ?? "published",
        seed_version: seedVersion,
      },
      transaction,
    });

    await page.update(
      {
        page_name: seedPage.pageName,
        slug: seedPage.slug,
        meta_title: seedPage.meta.title,
        meta_description: seedPage.meta.description,
        meta_keywords: seedPage.meta.keywords?.join(", ") ?? null,
        canonical_url: seedPage.meta.canonicalUrl ?? null,
        og_title: seedPage.meta.ogTitle ?? null,
        og_description: seedPage.meta.ogDescription ?? null,
        og_image: seedPage.meta.ogImage ?? null,
        og_image_alt: seedPage.meta.ogImageAlt ?? null,
        indexable: seedPage.meta.indexable ?? true,
        status: seedPage.status ?? "published",
        seed_version: seedVersion,
      },
      { transaction },
    );

    if (seedPage.resource) {
      const [resource] = await models.ResourcePage.findOrCreate({
        where: { page_id: page.id },
        defaults: {
          page_id: page.id,
          resource_name: seedPage.resource.resourceName,
          slug: seedPage.resource.slug,
          short_description: seedPage.resource.shortDescription ?? null,
          featured_image: seedPage.resource.featuredImage ?? null,
          featured_image_alt: seedPage.resource.featuredImageAlt ?? null,
          status: seedPage.resource.status ?? "published",
          display_order: seedPage.resource.displayOrder ?? 0,
        },
        transaction,
      });

      await resource.update(
        {
          resource_name: seedPage.resource.resourceName,
          slug: seedPage.resource.slug,
          short_description: seedPage.resource.shortDescription ?? null,
          featured_image: seedPage.resource.featuredImage ?? null,
          featured_image_alt: seedPage.resource.featuredImageAlt ?? null,
          status: seedPage.resource.status ?? "published",
          display_order: seedPage.resource.displayOrder ?? 0,
        },
        { transaction },
      );
    }

    await models.PageSection.destroy({ where: { page_id: page.id }, force: true, transaction });

    for (const [sectionIndex, seedSection] of seedPage.sections.entries()) {
      const section = await models.PageSection.create(
        {
          page_id: page.id,
          section_key: seedSection.sectionKey,
          section_type: seedSection.sectionType,
          internal_name: seedSection.internalName,
          heading: seedSection.heading ?? null,
          subheading: seedSection.subheading ?? null,
          description: seedSection.description ?? null,
          image_url: seedSection.imageUrl ?? null,
          image_alt: seedSection.imageAlt ?? null,
          background_image_url: seedSection.backgroundImageUrl ?? null,
          background_image_alt: seedSection.backgroundImageAlt ?? null,
          button_text: seedSection.buttonText ?? null,
          button_link: seedSection.buttonLink ?? null,
          settings_json: seedSection.settings ?? {},
          display_order: seedSection.displayOrder ?? sectionIndex,
          is_active: seedSection.isActive ?? true,
          is_required: seedSection.isRequired ?? false,
        },
        { transaction },
      );

      for (const [itemIndex, seedItem] of (seedSection.items ?? []).entries()) {
        await models.SectionItem.create(
          {
            section_id: section.id,
            item_type: seedItem.itemType,
            title: seedItem.title ?? null,
            subtitle: seedItem.subtitle ?? null,
            description: seedItem.description ?? null,
            icon: seedItem.icon ?? null,
            image_url: seedItem.imageUrl ?? null,
            image_alt: seedItem.imageAlt ?? null,
            button_text: seedItem.buttonText ?? null,
            button_link: seedItem.buttonLink ?? null,
            extra_data_json: seedItem.extraData ?? {},
            display_order: seedItem.displayOrder ?? itemIndex,
            is_active: seedItem.isActive ?? true,
          },
          { transaction },
        );
      }
    }

    return page;
  });
}

export async function seedAllPages() {
  for (const seedPage of cmsSeedPages) {
    await upsertSeedPage(seedPage);
  }
}
