import { INTERNAL_ROUTE_SET, ROUTES, getRedirectTarget, isExternalHref, normalizeHref } from "../routes/routeConfig.js";

function getDuplicateRouteDefinitions() {
  const seen = new Map();

  Object.entries(ROUTES).forEach(([key, value]) => {
    const bucket = seen.get(value) ?? [];
    bucket.push(key);
    seen.set(value, bucket);
  });

  return [...seen.entries()]
    .filter(([, keys]) => keys.length > 1)
    .map(([path, keys]) => ({ path, keys }));
}

export function validateRouteReferences(references = []) {
  const missing = [];
  const duplicateTargets = new Map();

  references.forEach((reference) => {
    const href = reference?.href ?? "";
    const label = reference?.label ?? "Unnamed link";
    const source = reference?.source ?? "Unknown source";

    if (!href || href === "#") {
      if (!href) {
        missing.push({
          label,
          source,
          href,
          reason: "Missing href",
        });
      }
      return;
    }

    if (isExternalHref(href)) {
      return;
    }

    const normalizedHref = normalizeHref(href);

    if (!normalizedHref) {
      return;
    }

    const resolvedTarget = getRedirectTarget(normalizedHref) ?? normalizedHref;
    const isKnownRoute = INTERNAL_ROUTE_SET.has(normalizedHref) || INTERNAL_ROUTE_SET.has(resolvedTarget);

    if (!isKnownRoute) {
      missing.push({
        label,
        source,
        href,
        reason: "Unknown internal route",
      });
    }

    const bucket = duplicateTargets.get(resolvedTarget) ?? [];
    bucket.push({ label, source, href });
    duplicateTargets.set(resolvedTarget, bucket);
  });

  const duplicateDestinationGroups = [...duplicateTargets.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([path, items]) => ({ path, items }));

  return {
    duplicateRouteDefinitions: getDuplicateRouteDefinitions(),
    duplicateDestinationGroups,
    missing,
  };
}

export function logRouteValidation(report, label = "Route validation") {
  if (!import.meta.env.DEV) {
    return;
  }

  const hasIssues =
    report.duplicateRouteDefinitions.length > 0 ||
    report.duplicateDestinationGroups.length > 0 ||
    report.missing.length > 0;

  if (!hasIssues) {
    console.info(`[${label}] No route issues found.`);
    return;
  }

  console.groupCollapsed(`[${label}] Route issues detected`);

  if (report.duplicateRouteDefinitions.length > 0) {
    console.table(report.duplicateRouteDefinitions);
  }

  if (report.duplicateDestinationGroups.length > 0) {
    console.table(
      report.duplicateDestinationGroups.flatMap((group) =>
        group.items.map((item) => ({
          destination: group.path,
          label: item.label,
          source: item.source,
          href: item.href,
        })),
      ),
    );
  }

  if (report.missing.length > 0) {
    console.table(report.missing);
  }

  console.groupEnd();
}
