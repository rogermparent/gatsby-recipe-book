import type { GatsbyNode, Node } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions: { createTypes }, schema }) => {
    createTypes([
      schema.buildObjectType({
        name: "Post",
        fields: {
          filename: "String!",
          date: { type: "String!", extensions: { dateformat: {} } },
          title: "String!",
          content: "String!",
          slug: "String!",
        },
        interfaces: ["Node"],
        extensions: {
          infer: false,
        },
      }),
    ]);
  };

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  createNodeId,
  actions: { createNode, createParentChildLink },
}) => {
  if (node.internal.type === "PostsJson") {
    const {
      title,
      content,
      internal: { contentDigest },
      parent,
      id,
    } = node;
    if (parent) {
      const fileNode = getNode(parent);
      if (fileNode) {
        const { name } = fileNode as Node & { name: string };
        if (name) {
          const fields = {
            title,
            content,
            filename: name,
            date: name,
            slug: name,
          };

          const postNode = {
            ...fields,
            id: createNodeId(`${id} >>> Post`),
            internal: {
              type: "Post",
              contentDigest,
            },
          };

          createNode(postNode);
          createParentChildLink({ parent: node, child: postNode });
        }
      }
    }
  }
};
