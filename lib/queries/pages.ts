export const GET_PAGE_BY_SLUG = `
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        slug
        uri
        title
        content
        date
        modified
        status
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        template {
          templateName
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
          }
        }
      }
    }
`;
