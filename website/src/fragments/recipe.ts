import { graphql } from "gatsby";

export const query = graphql`
  fragment PostData on Post {
    title
    content
    date(formatString: "YYYY-MM-DD, HH:mm")
  }
`;
