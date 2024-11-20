import {Section, Container, Article, Main} from "@/components/craft";
import {Metadata} from "next";
import {badgeVariants} from "@/components/ui/badge";
import {cn} from "@/lib/utils/utils";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import {Category} from "@/lib/types/blog";
import {getPostBySlug} from "@/lib/wordpress";
import NotFound from "@/app/not-found";
import {router} from "next/client";
import {notFound} from "next/navigation";

export async function generateMetadata({
                                           params,
                                       }: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound()
    }else{
      return {
        title: post.title,
        description: post.excerpt,
      };
    }


}

export default async function Page({params}: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound()
    }

    const date = new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Section>
            <Container>
                <Link
                    href="/blog"
                    className="inline-block mb-8 text-accent hover:underline"
                >
                    ← Back to Blog
                </Link>

                <div className="flex gap-2 mb-4">
                    {post.categories.nodes.map((category: Category) => (
                        <div
                            key={category.id}
                            className={cn(
                                badgeVariants({variant: "secondary"}),
                                "hover:bg-accent/50"
                            )}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                <h1>
                    <Balancer>
                        {post.title}
                    </Balancer>
                </h1>

                <div className="flex items-center gap-4 mt-4 mb-8 text-sm text-muted-foreground">
                    <span>{date}</span>
                    <span>•</span>
                    <span>By {post.author.node.name}</span>
                </div>

                {post.featuredImage && (
                    <div
                        className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
                        <Image
                            className="w-full h-full object-cover"
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            width={1200}
                            height={560}
                            priority
                        />
                    </div>
                )}

                <Article
                    dangerouslySetInnerHTML={{__html: post.content}}
                    className="prose prose-lg prose-accent max-w-none"
                />
            </Container>
        </Section>
    );
}
