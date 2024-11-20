import {gql} from "@apollo/client";

export const GET_ALL_TEAM_MEMBERS = `
  query GetTeamWithACF {
    teams {
      nodes {
        id
        title
        slug
        featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText
        }
      }
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
        office
        languages
        education
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

// lib/queries.ts

export const SEARCH_CONTENT_QUERY = `
  query SearchContent($searchTerm: String!) {
    posts(where: {search: $searchTerm}) {
      nodes {
        id
        title
        uri
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        contentType {
          node {
            name
            label
          }
        }
      }
    }
    pages(where: {search: $searchTerm}) {
      nodes {
        id
        title
        uri
        slug
        contentType {
          node {
            name
            label
          }
        }
      }
    }
    teams(where: {search: $searchTerm}) {
      nodes {
        id
        title
        uri
        slug
        teamFields {
          role
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        contentType {
          node {
            name
            label
          }
        }
      }
    }
    practiceAreas(where: {search: $searchTerm}) {
      nodes {
        id
        title
        uri
        slug
        contentType {
          node {
            name
            label
          }
        }
      }
    }
  }
`;
