import {gql} from "@apollo/client";

export const FETCH_FRONT_PAGE = gql`
  query FetchFrontPage {
  page(id: "/", idType: URI) {
    title
    content
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
}
`;


export const GET_PRIMARY_MENU = gql`
  query GetPrimaryMenu {
    menus(where: { location: PRIMARY }) {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            path
            label
            parentId
            cssClasses
            url
            target
          }
        }
      }
    }
  }
`;
