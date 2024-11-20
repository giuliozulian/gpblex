export const GET_ALL_CATEGORIES_QUERY = `
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        description
        count
        uri
        parent {
          node {
            id
            name
            slug
          }
        }
        children {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_ALL_TAGS_QUERY = `
  query GetAllTags {
    tags(first: 100) {
      nodes {
        id
        name
        slug
        description
        count
        uri
      }
    }
  }
`;

export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts($categoryId: [ID], $tagId: [ID]) {
    posts(
      where: {
        categoryIn: $categoryId
        tagIn: $tagId
        status: PUBLISH
      }
      first: 100
    ) {
      nodes {
        id
        title
        date
        slug
        uri
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY_BY_ID = `
  query GetCategoryById($id: ID!) {
    category(id: $id) {
      id
      name
      slug
      description
      uri
      count
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      date
      slug
      uri
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
          uri
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;

