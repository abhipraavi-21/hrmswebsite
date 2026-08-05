function normalizeText(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replaceAll("â‚¹", "\u20B9")
    .replaceAll("Â·", "\u00B7")
    .replaceAll("âœ“", "\u2713");
}

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [key, normalizeValue(entryValue)]),
    );
  }

  return normalizeText(value);
}

export function serializeItem(item) {
  return {
    id: item.id,
    itemType: item.item_type,
    title: normalizeText(item.title),
    subtitle: normalizeText(item.subtitle),
    description: normalizeText(item.description),
    icon: normalizeText(item.icon),
    imageUrl: normalizeText(item.image_url),
    buttonText: normalizeText(item.button_text),
    buttonLink: normalizeText(item.button_link),
    extraData: normalizeValue(item.extra_data_json ?? {}),
    displayOrder: item.display_order,
    isActive: item.is_active,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function serializeSection(section) {
  const items = (section.items ?? []).slice().sort((a, b) => a.display_order - b.display_order);

  return {
    id: section.id,
    sectionKey: section.section_key,
    sectionType: section.section_type,
    internalName: normalizeText(section.internal_name),
    heading: normalizeText(section.heading),
    subheading: normalizeText(section.subheading),
    description: normalizeText(section.description),
    imageUrl: normalizeText(section.image_url),
    backgroundImageUrl: normalizeText(section.background_image_url),
    buttonText: normalizeText(section.button_text),
    buttonLink: normalizeText(section.button_link),
    settings: normalizeValue(section.settings_json ?? {}),
    displayOrder: section.display_order,
    isActive: section.is_active,
    isRequired: section.is_required,
    items: items.map(serializeItem),
    createdAt: section.createdAt,
    updatedAt: section.updatedAt,
  };
}

export function serializePage(page) {
  const sections = (page.sections ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map(serializeSection);

  return {
    id: page.id,
    pageKey: page.page_key,
    pageName: normalizeText(page.page_name),
    slug: normalizeText(page.slug),
    metaTitle: normalizeText(page.meta_title),
    metaDescription: normalizeText(page.meta_description),
    metaKeywords: normalizeText(page.meta_keywords),
    canonicalUrl: normalizeText(page.canonical_url),
    ogTitle: normalizeText(page.og_title),
    ogDescription: normalizeText(page.og_description),
    ogImage: normalizeText(page.og_image),
    indexable: page.indexable,
    status: page.status,
    seedVersion: page.seed_version,
    sections,
    resourcePage: page.resourcePage
      ? {
          id: page.resourcePage.id,
          resourceName: normalizeText(page.resourcePage.resource_name),
          slug: normalizeText(page.resourcePage.slug),
          shortDescription: normalizeText(page.resourcePage.short_description),
          featuredImage: normalizeText(page.resourcePage.featured_image),
          status: page.resourcePage.status,
          displayOrder: page.resourcePage.display_order,
        }
      : null,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  };
}
