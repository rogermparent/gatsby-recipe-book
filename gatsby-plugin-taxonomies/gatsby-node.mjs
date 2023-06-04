import slugify from "@sindresorhus/slugify";
import { buildLinkType, createTaxonomyLinkNodes } from "./index.mjs";
import getValue from "lodash/get.js";

export const createSchemaCustomization = (api, { taxonomies }) => {
  const taxonomyEntries = Object.entries(taxonomies);
  const types = [];
  for (const [name] of taxonomyEntries) {
    types.push(buildLinkType(api, { name: name + "Link" }));
  }
  api.actions.createTypes(types);
};

const getTaxonomyTermsFromNode = (node, types) => {
  const valueTypeOptions = types[node.internal.type];
  if (valueTypeOptions === undefined) {
    return undefined;
  } else if (typeof valueTypeOptions === "string") {
    return getValue(node, valueTypeOptions);
  } else if (typeof valueTypeOptions === "object") {
    const { field, map } = valueTypeOptions;
    const fieldValue = getValue(node, field);
    if (fieldValue) {
      if (map) {
        return fieldValue.map((item) => getValue(item, map));
      }
      return fieldValue;
    }
  }
};

export const onCreateNode = (api, options) => {
  const { node } = api;
  const { taxonomies } = options;
  const taxonomyEntries = Object.entries(taxonomies);
  for (const [name, types] of taxonomyEntries) {
    const terms = getTaxonomyTermsFromNode(node, types);
    if (Array.isArray(terms)) {
      createTaxonomyLinkNodes(api, {
        terms: terms.map((term) => ({ value: term, slug: slugify(term) })),
        type: name + "Link",
      });
    }
  }
};
