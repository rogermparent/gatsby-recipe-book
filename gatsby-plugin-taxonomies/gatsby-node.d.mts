import { CreateNodeArgs, CreateSchemaCustomizationArgs } from "gatsby";

type ValueNodeOptions = string | { field: string; map?: string };
interface TaxonomyPluginOptions {
  taxonomies: Record<string, Record<string, ValueNodeOptions>>;
}

export const createSchemaCustomization: (
  api: CreateSchemaCustomizationArgs,
  options: TaxonomyPluginOptions
) => void;

declare const getTaxonomyTermsFromNode: (
  node: Node & Record<string, unknown>,
  types: Record<string, ValueNodeOptions>
) => unknown;

export const onCreateNode: (
  api: CreateNodeArgs,
  options: TaxonomyPluginOptions
) => void;
