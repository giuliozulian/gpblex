import {PracticeArea} from "@/lib/types/menu";

export interface TeamFields {
    role?: string;
    email?: string;
    languages?: string;
    office?: string;
    habilitation?: string;
    education?: string;
    practiceAreas?: PracticeArea[];
}

export interface TeamMember {
    id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText: string;
        }
    };
    teamFields?: TeamFields;
}
