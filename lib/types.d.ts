type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

interface MenuItem {
  id: string;
  label: string;
  path: string;
  parentId: string | null;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
}

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
