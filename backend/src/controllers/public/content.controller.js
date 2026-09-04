import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { getContactSettings, createEnquiry } from "../../services/contact.service.js";
import { listPricingPlans } from "../../services/pricing.service.js";
import {
  getPageByKey,
  getPageBySlug,
  listResources,
  pageKeyBelongsToProduct,
} from "../../services/cms.service.js";
import { serializePage } from "../../utils/serializeCms.js";

const PRODUCT_PAGE_KEYS = {
  hrms: {
    home: "hrms",
    pricing: "pricing",
    contact: "contact-us",
  },
  "bulk-email": {
    home: "bulk-email",
    pricing: "bulk-email-pricing",
    contact: "bulk-email-contact-us",
  },
  "asset-management": {
    home: "asset-management-suite",
    pricing: "asset-management-pricing",
    contact: "asset-management-contact-us",
  },
};

function getProductPageKeys(product) {
  const config = PRODUCT_PAGE_KEYS[product];

  if (!config) {
    throw new AppError("Unknown product namespace", 404);
  }

  return config;
}

export const getPage = asyncHandler(async (request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageByKey(request.params.pageKey, { publishedOnly: true }))));
});

export const getHrms = asyncHandler(async (_request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageByKey("hrms", { publishedOnly: true }))));
});

export const getProductHome = asyncHandler(async (request, response) => {
  const { home } = getProductPageKeys(request.params.product);
  response.json(
    successResponse(
      "Product content fetched successfully",
      serializePage(await getPageByKey(home, { publishedOnly: true })),
    ),
  );
});

export const getProductPage = asyncHandler(async (request, response) => {
  const product = request.params.product;
  const pageKey = request.params.pageKey;

  getProductPageKeys(product);

  if (!pageKeyBelongsToProduct(pageKey, product)) {
    throw new AppError("Page does not belong to this product namespace", 404);
  }

  response.json(
    successResponse(
      "Product page content fetched successfully",
      serializePage(await getPageByKey(pageKey, { publishedOnly: true })),
    ),
  );
});

export const getResources = asyncHandler(async (_request, response) => {
  response.json(successResponse("Content fetched successfully", await listResources({ publishedOnly: true })));
});

export const getProductResources = asyncHandler(async (request, response) => {
  getProductPageKeys(request.params.product);
  response.json(
    successResponse(
      "Product resources fetched successfully",
      await listResources({ publishedOnly: true, product: request.params.product }),
    ),
  );
});

export const getResource = asyncHandler(async (request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageBySlug(request.params.slug, { publishedOnly: true }))));
});

export const getProductResource = asyncHandler(async (request, response) => {
  getProductPageKeys(request.params.product);
  response.json(
    successResponse(
      "Product resource content fetched successfully",
      serializePage(
        await getPageBySlug(request.params.slug, {
          publishedOnly: true,
          product: request.params.product,
        }),
      ),
    ),
  );
});

export const getPricing = asyncHandler(async (_request, response) => {
  const page = serializePage(await getPageByKey("pricing", { publishedOnly: true }));
  const plans = await listPricingPlans({ activeOnly: true });
  response.json(successResponse("Content fetched successfully", { ...page, plans }));
});

export const getProductPricing = asyncHandler(async (request, response) => {
  const { pricing } = getProductPageKeys(request.params.product);
  const page = serializePage(await getPageByKey(pricing, { publishedOnly: true }));
  const plans = await listPricingPlans({ activeOnly: true });
  response.json(
    successResponse("Product pricing content fetched successfully", { ...page, plans }),
  );
});

export const getContact = asyncHandler(async (_request, response) => {
  const page = serializePage(await getPageByKey("contact-us", { publishedOnly: true }));
  const settings = await getContactSettings();
  response.json(successResponse("Content fetched successfully", { ...page, settings }));
});

export const getProductContact = asyncHandler(async (request, response) => {
  const { contact } = getProductPageKeys(request.params.product);
  const page = serializePage(await getPageByKey(contact, { publishedOnly: true }));
  const settings = await getContactSettings();
  response.json(
    successResponse("Product contact content fetched successfully", { ...page, settings }),
  );
});

export const submitContactEnquiry = asyncHandler(async (request, response) => {
  const enquiry = await createEnquiry(request.body, request.ip);
  response.status(201).json(successResponse("Enquiry submitted successfully", { id: enquiry.id }));
});
