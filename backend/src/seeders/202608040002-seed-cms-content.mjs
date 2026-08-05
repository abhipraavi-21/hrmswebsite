import { Sequelize } from "sequelize";
import { seedVersion, cmsSeedPages, contactSettingsSeed, pricingPlansSeed } from "../../../shared/cms/index.js";

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    for (const page of cmsSeedPages) {
      const existingPages = await queryInterface.sequelize.query(
        "SELECT id FROM pages WHERE page_key = :pageKey LIMIT 1",
        {
          replacements: { pageKey: page.pageKey },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );

      let pageId = existingPages[0]?.id;

      if (!pageId) {
        await queryInterface.bulkInsert(
          "pages",
          [
            {
              page_key: page.pageKey,
              page_name: page.pageName,
              slug: page.slug,
              meta_title: page.meta.title,
              meta_description: page.meta.description,
              meta_keywords: page.meta.keywords?.join(", ") ?? null,
              canonical_url: page.meta.canonicalUrl ?? null,
              og_title: page.meta.ogTitle ?? null,
              og_description: page.meta.ogDescription ?? null,
              og_image: page.meta.ogImage ?? null,
              indexable: page.meta.indexable ?? true,
              status: page.status ?? "published",
              seed_version: seedVersion,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          { transaction },
        );

        const insertedPages = await queryInterface.sequelize.query(
          "SELECT id FROM pages WHERE page_key = :pageKey LIMIT 1",
          {
            replacements: { pageKey: page.pageKey },
            type: Sequelize.QueryTypes.SELECT,
            transaction,
          },
        );

        pageId = insertedPages[0]?.id;
      } else {
        await queryInterface.bulkUpdate(
          "pages",
          {
            page_name: page.pageName,
            slug: page.slug,
            meta_title: page.meta.title,
            meta_description: page.meta.description,
            meta_keywords: page.meta.keywords?.join(", ") ?? null,
            canonical_url: page.meta.canonicalUrl ?? null,
            og_title: page.meta.ogTitle ?? null,
            og_description: page.meta.ogDescription ?? null,
            og_image: page.meta.ogImage ?? null,
            indexable: page.meta.indexable ?? true,
            status: page.status ?? "published",
            seed_version: seedVersion,
            updated_at: new Date(),
          },
          { id: pageId },
          { transaction },
        );
      }

      await queryInterface.bulkDelete("page_sections", { page_id: pageId }, { transaction });

      for (const [sectionIndex, section] of page.sections.entries()) {
        await queryInterface.bulkInsert(
          "page_sections",
          [
            {
              page_id: pageId,
              section_key: section.sectionKey,
              section_type: section.sectionType,
              internal_name: section.internalName,
              heading: section.heading ?? null,
              subheading: section.subheading ?? null,
              description: section.description ?? null,
              image_url: section.imageUrl ?? null,
              background_image_url: section.backgroundImageUrl ?? null,
              button_text: section.buttonText ?? null,
              button_link: section.buttonLink ?? null,
              settings_json: JSON.stringify(section.settings ?? {}),
              display_order: section.displayOrder ?? sectionIndex,
              is_active: section.isActive ?? true,
              is_required: section.isRequired ?? false,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          { transaction },
        );

        const insertedSections = await queryInterface.sequelize.query(
          "SELECT id FROM page_sections WHERE page_id = :pageId AND section_key = :sectionKey ORDER BY id DESC LIMIT 1",
          {
            replacements: { pageId, sectionKey: section.sectionKey },
            type: Sequelize.QueryTypes.SELECT,
            transaction,
          },
        );

        const sectionId = insertedSections[0]?.id;

        if (section.items?.length) {
          await queryInterface.bulkInsert(
            "section_items",
            section.items.map((item, itemIndex) => ({
              section_id: sectionId,
              item_type: item.itemType,
              title: item.title ?? null,
              subtitle: item.subtitle ?? null,
              description: item.description ?? null,
              icon: item.icon ?? null,
              image_url: item.imageUrl ?? null,
              button_text: item.buttonText ?? null,
              button_link: item.buttonLink ?? null,
              extra_data_json: JSON.stringify(item.extraData ?? {}),
              display_order: item.displayOrder ?? itemIndex,
              is_active: item.isActive ?? true,
              created_at: new Date(),
              updated_at: new Date(),
            })),
            { transaction },
          );
        }
      }

      if (page.resource) {
        await queryInterface.bulkDelete("resource_pages", { page_id: pageId }, { transaction });

        await queryInterface.bulkInsert(
          "resource_pages",
          [
            {
              page_id: pageId,
              resource_name: page.resource.resourceName,
              slug: page.resource.slug,
              short_description: page.resource.shortDescription ?? null,
              featured_image: page.resource.featuredImage ?? null,
              status: page.resource.status ?? "published",
              display_order: page.resource.displayOrder ?? 0,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          { transaction },
        );
      }
    }

    await queryInterface.bulkDelete("pricing_features", null, { transaction });
    await queryInterface.bulkDelete("pricing_plans", null, { transaction });

    for (const [planIndex, plan] of pricingPlansSeed.entries()) {
      await queryInterface.bulkInsert(
        "pricing_plans",
        [
          {
            name: plan.name,
            slug: plan.slug,
            short_description: plan.shortDescription ?? null,
            currency: plan.currency ?? "INR",
            monthly_price: plan.monthlyPrice,
            yearly_price: plan.yearlyPrice ?? null,
            original_price: plan.originalPrice ?? null,
            billing_label: plan.billingLabel ?? null,
            badge_text: plan.badgeText ?? null,
            button_text: plan.buttonText ?? null,
            button_link: plan.buttonLink ?? null,
            is_popular: plan.isPopular ?? false,
            is_active: plan.isActive ?? true,
            display_order: plan.displayOrder ?? planIndex,
            settings_json: JSON.stringify(plan.settings ?? {}),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );

      const insertedPlans = await queryInterface.sequelize.query(
        "SELECT id FROM pricing_plans WHERE slug = :slug LIMIT 1",
        {
          replacements: { slug: plan.slug },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );

      const planId = insertedPlans[0]?.id;

      if (plan.features?.length) {
        await queryInterface.bulkInsert(
          "pricing_features",
          plan.features.map((feature, featureIndex) => ({
            pricing_plan_id: planId,
            feature_text: feature.featureText,
            is_included: feature.isIncluded ?? true,
            display_order: feature.displayOrder ?? featureIndex,
            category: feature.category ?? null,
            created_at: new Date(),
            updated_at: new Date(),
          })),
          { transaction },
        );
      }
    }

    await queryInterface.bulkDelete("contact_settings", null, { transaction });
    await queryInterface.bulkInsert(
      "contact_settings",
      [
        {
          id: 1,
          page_title: contactSettingsSeed.pageTitle ?? null,
          page_subtitle: contactSettingsSeed.pageSubtitle ?? null,
          description: contactSettingsSeed.description ?? null,
          address: contactSettingsSeed.address ?? null,
          phone_primary: contactSettingsSeed.phonePrimary ?? null,
          phone_secondary: contactSettingsSeed.phoneSecondary ?? null,
          email_primary: contactSettingsSeed.emailPrimary ?? null,
          email_secondary: contactSettingsSeed.emailSecondary ?? null,
          business_hours: contactSettingsSeed.businessHours ?? null,
          map_embed_url: contactSettingsSeed.mapEmbedUrl ?? null,
          form_heading: contactSettingsSeed.formHeading ?? null,
          form_description: contactSettingsSeed.formDescription ?? null,
          submit_button_text: contactSettingsSeed.submitButtonText ?? null,
          success_message: contactSettingsSeed.successMessage ?? null,
          error_message: contactSettingsSeed.errorMessage ?? null,
          social_links_json: JSON.stringify(contactSettingsSeed.socialLinks ?? []),
          settings_json: JSON.stringify(contactSettingsSeed.settings ?? {}),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { transaction },
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("resource_pages", null, {});
  await queryInterface.bulkDelete("section_items", null, {});
  await queryInterface.bulkDelete("page_sections", null, {});
  await queryInterface.bulkDelete("pages", null, {});
  await queryInterface.bulkDelete("pricing_features", null, {});
  await queryInterface.bulkDelete("pricing_plans", null, {});
  await queryInterface.bulkDelete("contact_settings", null, {});
}
