
interface Author {
    node: {
        name: string;
        avatar: {
            url?: string;
        };
    }
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Tag {
    id: string;
    name: string;
    slug: string;
}

interface FeaturedImage {
    node: {
        sourceUrl: string;
        altText: string;
    }
}

export interface Post {
    id: string;
    title: string;
    date: string;
    slug: string;
    uri: string;
    excerpt: string;
    modified?: string,
    featuredImage: FeaturedImage;
    categories: {
        nodes: Category[];
    };
    tags: {
        nodes: Tag[];
    };
    author: Author;
}
