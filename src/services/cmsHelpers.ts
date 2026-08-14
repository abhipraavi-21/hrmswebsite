import type { PublicCmsItem, PublicCmsPage, PublicCmsSection } from "./cmsTypes";

export function getSection(page: PublicCmsPage | null | undefined, sectionKey: string) {
  return page?.sections.find((section) => section.sectionKey === sectionKey) ?? null;
}

export function getSectionItems(
  section: PublicCmsSection | null | undefined,
  itemType?: string,
) {
  const items = section?.items ?? [];

  if (!itemType) {
    return items;
  }

  return items.filter((item) => item.itemType === itemType);
}

export function getSetting<T>(
  section: PublicCmsSection | null | undefined,
  key: string,
  fallback: T,
) {
  return (section?.settings?.[key] as T | undefined) ?? fallback;
}

export function getItemExtra<T>(item: PublicCmsItem | null | undefined, key: string, fallback: T) {
  return (item?.extraData?.[key] as T | undefined) ?? fallback;
}
