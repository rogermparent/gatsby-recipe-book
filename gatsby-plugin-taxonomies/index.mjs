/**
 * @type { (api: import('gatsby').CreateSchemaCustomizationArgs, args: { name: string }) => void }
 */
export const buildLinkType = ({ schema }, { name }) =>
  schema.buildObjectType({
    name,
    fields: {
      value: "String!",
      slug: "String!",
    },
    interfaces: ["Node"],
    extensions: {
      infer: false,
    },
  });

/**
 * @type { (api: import('gatsby').CreateNodeArgs, args: { type: string, node?: import('gatsby').Node, terms: {value: string, slug: string}[] }) => void }
 */
export const createTaxonomyLinkNodes = (
  {
    node: defaultNode,
    createNodeId,
    createContentDigest,
    actions: { createNode, createParentChildLink },
  },
  { terms, type, node }
) => {
  const parentNode = node || defaultNode;
  for (const { slug, value } of terms) {
    const idSeed = `${type} >>> ${slug} >>> ${value}`;
    const fields = {
      value,
      slug,
    };
    const taxonomyTermNode = {
      ...fields,
      id: createNodeId(idSeed),
      parent: parentNode.id,
      internal: {
        type,
        contentDigest: createContentDigest(fields),
      },
    };
    createNode(taxonomyTermNode);
    createParentChildLink({
      parent: parentNode,
      child: taxonomyTermNode,
    });
  }
};
