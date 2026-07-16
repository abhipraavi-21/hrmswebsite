import { useEffect } from "react";

type PageSEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
};

function getOrCreateTag<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  selector: string,
  createAttrs?: Record<string, string>,
) {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (existing) {
    return { element: existing, created: false as const };
  }

  const element = document.createElement(tagName);
  for (const [name, value] of Object.entries(createAttrs ?? {})) {
    element.setAttribute(name, value);
  }
  document.head.appendChild(element);
  return { element, created: true as const };
}

export default function PageSEO({ title, description, canonicalPath, image }: PageSEOProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;

    const canonical = getOrCreateTag("link", 'link[rel="canonical"]', {
      rel: "canonical",
    }) as { element: HTMLLinkElement; created: boolean };

    const descriptionTag = getOrCreateTag("meta", 'meta[name="description"]', {
      name: "description",
    }) as { element: HTMLMetaElement; created: boolean };

    const ogTitleTag = getOrCreateTag("meta", 'meta[property="og:title"]', {
      property: "og:title",
    }) as { element: HTMLMetaElement; created: boolean };
    const ogDescriptionTag = getOrCreateTag("meta", 'meta[property="og:description"]', {
      property: "og:description",
    }) as { element: HTMLMetaElement; created: boolean };
    const ogUrlTag = getOrCreateTag("meta", 'meta[property="og:url"]', {
      property: "og:url",
    }) as { element: HTMLMetaElement; created: boolean };
    const ogTypeTag = getOrCreateTag("meta", 'meta[property="og:type"]', {
      property: "og:type",
    }) as { element: HTMLMetaElement; created: boolean };
    const ogSiteNameTag = getOrCreateTag("meta", 'meta[property="og:site_name"]', {
      property: "og:site_name",
    }) as { element: HTMLMetaElement; created: boolean };

    const twitterCardTag = getOrCreateTag("meta", 'meta[name="twitter:card"]', {
      name: "twitter:card",
    }) as { element: HTMLMetaElement; created: boolean };
    const twitterTitleTag = getOrCreateTag("meta", 'meta[name="twitter:title"]', {
      name: "twitter:title",
    }) as { element: HTMLMetaElement; created: boolean };
    const twitterDescriptionTag = getOrCreateTag("meta", 'meta[name="twitter:description"]', {
      name: "twitter:description",
    }) as { element: HTMLMetaElement; created: boolean };

    const previous = {
      canonicalHref: canonical.element.getAttribute("href"),
      description: descriptionTag.element.getAttribute("content"),
      ogTitle: ogTitleTag.element.getAttribute("content"),
      ogDescription: ogDescriptionTag.element.getAttribute("content"),
      ogUrl: ogUrlTag.element.getAttribute("content"),
      ogType: ogTypeTag.element.getAttribute("content"),
      ogSiteName: ogSiteNameTag.element.getAttribute("content"),
      twitterCard: twitterCardTag.element.getAttribute("content"),
      twitterTitle: twitterTitleTag.element.getAttribute("content"),
      twitterDescription: twitterDescriptionTag.element.getAttribute("content"),
    };

    document.title = title;

    if (canonicalPath) {
      canonical.element.setAttribute("href", new URL(canonicalPath, window.location.origin).href);
    }
    descriptionTag.element.setAttribute("content", description);
    ogTitleTag.element.setAttribute("content", title);
    ogDescriptionTag.element.setAttribute("content", description);
    ogUrlTag.element.setAttribute(
      "content",
      canonicalPath ? new URL(canonicalPath, window.location.origin).href : window.location.href,
    );
    ogTypeTag.element.setAttribute("content", "website");
    ogSiteNameTag.element.setAttribute("content", "Altroz HRMS");
    twitterCardTag.element.setAttribute("content", image ? "summary_large_image" : "summary");
    twitterTitleTag.element.setAttribute("content", title);
    twitterDescriptionTag.element.setAttribute("content", description);

    if (image) {
      const ogImageTag = getOrCreateTag("meta", 'meta[property="og:image"]', {
        property: "og:image",
      }) as { element: HTMLMetaElement; created: boolean };
      const twitterImageTag = getOrCreateTag("meta", 'meta[name="twitter:image"]', {
        name: "twitter:image",
      }) as { element: HTMLMetaElement; created: boolean };

      const previousImage = {
        ogImage: ogImageTag.element.getAttribute("content"),
        twitterImage: twitterImageTag.element.getAttribute("content"),
      };

      ogImageTag.element.setAttribute("content", image);
      twitterImageTag.element.setAttribute("content", image);

      return () => {
        document.title = previousTitle;

        if (canonical.created) canonical.element.remove();
        else if (previous.canonicalHref !== null)
          canonical.element.setAttribute("href", previous.canonicalHref);

        if (descriptionTag.created) descriptionTag.element.remove();
        else if (previous.description !== null)
          descriptionTag.element.setAttribute("content", previous.description);

        if (ogTitleTag.created) ogTitleTag.element.remove();
        else if (previous.ogTitle !== null)
          ogTitleTag.element.setAttribute("content", previous.ogTitle);

        if (ogDescriptionTag.created) ogDescriptionTag.element.remove();
        else if (previous.ogDescription !== null)
          ogDescriptionTag.element.setAttribute("content", previous.ogDescription);

        if (ogUrlTag.created) ogUrlTag.element.remove();
        else if (previous.ogUrl !== null) ogUrlTag.element.setAttribute("content", previous.ogUrl);

        if (ogTypeTag.created) ogTypeTag.element.remove();
        else if (previous.ogType !== null)
          ogTypeTag.element.setAttribute("content", previous.ogType);

        if (ogSiteNameTag.created) ogSiteNameTag.element.remove();
        else if (previous.ogSiteName !== null)
          ogSiteNameTag.element.setAttribute("content", previous.ogSiteName);

        if (twitterCardTag.created) twitterCardTag.element.remove();
        else if (previous.twitterCard !== null)
          twitterCardTag.element.setAttribute("content", previous.twitterCard);

        if (twitterTitleTag.created) twitterTitleTag.element.remove();
        else if (previous.twitterTitle !== null)
          twitterTitleTag.element.setAttribute("content", previous.twitterTitle);

        if (twitterDescriptionTag.created) twitterDescriptionTag.element.remove();
        else if (previous.twitterDescription !== null)
          twitterDescriptionTag.element.setAttribute("content", previous.twitterDescription);

        if (ogImageTag.created) ogImageTag.element.remove();
        else if (previousImage.ogImage !== null)
          ogImageTag.element.setAttribute("content", previousImage.ogImage);

        if (twitterImageTag.created) twitterImageTag.element.remove();
        else if (previousImage.twitterImage !== null)
          twitterImageTag.element.setAttribute("content", previousImage.twitterImage);
      };
    }

    return () => {
      document.title = previousTitle;

      if (canonical.created) canonical.element.remove();
      else if (previous.canonicalHref !== null)
        canonical.element.setAttribute("href", previous.canonicalHref);

      if (descriptionTag.created) descriptionTag.element.remove();
      else if (previous.description !== null)
        descriptionTag.element.setAttribute("content", previous.description);

      if (ogTitleTag.created) ogTitleTag.element.remove();
      else if (previous.ogTitle !== null)
        ogTitleTag.element.setAttribute("content", previous.ogTitle);

      if (ogDescriptionTag.created) ogDescriptionTag.element.remove();
      else if (previous.ogDescription !== null)
        ogDescriptionTag.element.setAttribute("content", previous.ogDescription);

      if (ogUrlTag.created) ogUrlTag.element.remove();
      else if (previous.ogUrl !== null) ogUrlTag.element.setAttribute("content", previous.ogUrl);

      if (ogTypeTag.created) ogTypeTag.element.remove();
      else if (previous.ogType !== null) ogTypeTag.element.setAttribute("content", previous.ogType);

      if (ogSiteNameTag.created) ogSiteNameTag.element.remove();
      else if (previous.ogSiteName !== null)
        ogSiteNameTag.element.setAttribute("content", previous.ogSiteName);

      if (twitterCardTag.created) twitterCardTag.element.remove();
      else if (previous.twitterCard !== null)
        twitterCardTag.element.setAttribute("content", previous.twitterCard);

      if (twitterTitleTag.created) twitterTitleTag.element.remove();
      else if (previous.twitterTitle !== null)
        twitterTitleTag.element.setAttribute("content", previous.twitterTitle);

      if (twitterDescriptionTag.created) twitterDescriptionTag.element.remove();
      else if (previous.twitterDescription !== null)
        twitterDescriptionTag.element.setAttribute("content", previous.twitterDescription);
    };
  }, [canonicalPath, description, image, title]);

  return null;
}
