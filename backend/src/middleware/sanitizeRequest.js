import sanitizeHtml from "sanitize-html";

function sanitizeValue(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeValue(nestedValue)]),
    );
  }

  return value;
}

export function sanitizeRichText(value = "") {
  return sanitizeHtml(value, {
    allowedTags: [
      "p",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "a",
      "br",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}

export function sanitizeRequest(request, _response, next) {
  request.body = sanitizeValue(request.body);
  request.query = sanitizeValue(request.query);
  next();
}
