import {gql} from "@apollo/client";

export const GET_ALL_TEAM_MEMBERS = `
  query GetTeamWithACF {
    teams {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export const GET_TEAM_MEMBER = `
  query GetTeamMember($id: ID!) {
    team(id: $id, idType: DATABASE_ID) {
      databaseId
      title
      slug
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText
        }
      }
      teamFields {
        role
        office
        languages
        practiceAreas {
          ... on PracticeArea {
            id
            title
            slug
          }
        }
      }
    }
  }
`;

export const GET_TEAM_MEMBER_BY_SLUG = `
  query GetTeamMember($slug: ID!) {
    team(id: $slug, idType: SLUG) {
      databaseId
      title
      slug
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText
        }
      }
      teamFields {
        role
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
