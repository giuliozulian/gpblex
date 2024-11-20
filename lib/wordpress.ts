// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from 'query-string'

import {Category, FeaturedMedia, Page, Tag,} from "./wordpress.d";
import {
    GET_ALL_TEAM_MEMBERS,
    GET_TEAM_MEMBER_BY_SLUG,
    SEARCH_CONTENT_QUERY,
} from "@/lib/queries";
import {CACHE_TIMEOUT} from "@/lib/utils/utils";
import {
    GET_ALL_CATEGORIES_QUERY,
    GET_ALL_POSTS_QUERY,
    GET_ALL_TAGS_QUERY,
    GET_CATEGORY_BY_ID, GET_POST_BY_SLUG
} from "@/lib/queries/blog";
import {Post} from "@/lib/types/blog";
import {GET_PAGE_BY_SLUG} from "@/lib/queries/pages";

const baseUrl = process.env.WORDPRESS_URL;

function getUrl(path: string, query?: Record<string, any>) {
    const params = query ? querystring.stringify(query) : null

    return `${baseUrl}${path}${params ? `?${params}` : ""}`
}

export async function getAllPosts(filterParams?: {
    tag?: string;
    category?: string;
}) {
    try {
        // Se non sono specificati tag o category, passa null
        // GraphQL ignora questi filtri quando sono null
        const variables = {
            categoryId: filterParams?.category ? [filterParams.category] : null,
            tagId: filterParams?.tag ? [filterParams.tag] : null
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_ALL_POSTS_QUERY,
                variables
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data?.posts?.nodes || [];

    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPageBySlug(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_PAGE_BY_SLUG,
                variables: {
                    slug: slug
                }
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data.page;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_POST_BY_SLUG,
                variables: {
                    slug: slug
                }
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data.post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}


export async function getAllCategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_ALL_CATEGORIES_QUERY
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data?.categories?.nodes || [];

    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getCategoryById(id: string): Promise<Category | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_CATEGORY_BY_ID,
                variables: {
                    id: id
                }
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data?.category || null;

    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    const url = getUrl("/wp-json/wp/v2/categories", {slug});
    const response = await fetch(url);
    const category: Category[] = await response.json();
    return category[0];
}

export async function getTagBySlug(slug: string): Promise<Tag> {
    const url = getUrl("/wp-json/wp/v2/tags", {slug});
    const response = await fetch(url);
    const tag: Tag[] = await response.json();
    return tag[0];
}

export async function getPostsByCategorySlug(
    categorySlug: string
): Promise<Post[]> {
    const category = await getCategoryBySlug(categorySlug);
    const url = getUrl("/wp-json/wp/v2/posts", {categories: category.id});
    const response = await fetch(url);
    const posts: Post[] = await response.json();
    return posts;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
    const tag = await getTagBySlug(tagSlug);
    const url = getUrl("/wp-json/wp/v2/posts", {tags: tag.id});
    const response = await fetch(url);
    const posts: Post[] = await response.json();
    return posts;
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
    const url = getUrl(`/wp-json/wp/v2/media/${id}`);
    const response = await fetch(url);
    const featuredMedia: FeaturedMedia = await response.json();
    return featuredMedia;
}


export async function getFrontPage() {
    try {
        const response = await fetch(`${process.env.WORDPRESS_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          query FrontPage {
            nodeByUri(uri: "/") {
              __typename
              ... on ContentType {
                id
                name
              }
              ... on Page {
                id
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
          }
        `
            }),
            next: {revalidate: CACHE_TIMEOUT}
        });

        const {data} = await response.json();
        return data?.nodeByUri;
    } catch (error) {
        console.error('Error fetching front page:', error);
        throw error;
    }
}

export async function getTeamMembers() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_ALL_TEAM_MEMBERS
            }),
            next: {revalidate: CACHE_TIMEOUT}
        });

        const {data} = await response.json();

        return data?.teams?.nodes || [];
    } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
    }
}

export async function getTeamMemberBySlug(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_TEAM_MEMBER_BY_SLUG,
                variables: {
                    slug: slug
                }
            }),
            next: { revalidate: CACHE_TIMEOUT }
        });

        const { data } = await response.json();
        return data?.team;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getSearchResults(term: string) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: SEARCH_CONTENT_QUERY,
                variables: {
                    searchTerm: term
                }
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();

        const allResults = [
            ...(data?.posts?.nodes || []),
            ...(data?.pages?.nodes || []),
            ...(data?.teams?.nodes || []),
            ...(data?.practiceAreas?.nodes || [])
        ];

        return allResults;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function getAllTags() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_ALL_TAGS_QUERY
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data?.tags?.nodes || [];

    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
}
