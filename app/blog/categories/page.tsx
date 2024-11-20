import {getAllCategories} from "@/lib/wordpress";
import {Section, Container} from "@/components/craft";
import {Metadata} from "next";
import Link from "next/link";
import BackButton from "@/components/back";
import {Badge} from "@/components/ui/badge";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "All Categories",
        description: "Browse all categories on the site.",
    };
}

export default async function Page() {
    const categories = await getAllCategories();

    return (
        <Section>
            <Container>
                <BackButton/>
                <h2>All Categories</h2>
                <div className="inline-flex gap-4">
                    {categories.map((category: any) => (
                        <Link key={category.id} href={`/posts/?category=${category.id}`}>
                            <Badge
                                size="big"
                                variant="secondary">{category.name}</Badge>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
