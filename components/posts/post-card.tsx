  import Image from "next/image";
  import Link from "next/link";

  import { Post } from "@/lib/types/blog";
  import { cn } from "@/lib/utils/utils";

  import {
    getCategoryById,
  } from "@/lib/wordpress";
  import {Badge} from "@/components/ui/badge";

  export default async function PostCard({ post }: { post: Post }) {
    const date = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    return (

        <Link
            href={`/blog${post.uri}`}
            className={cn(
                "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-4",
                "hover:bg-accent/75 transition-all"
            )}
        >

          <div className="flex gap-2 flex-wrap">
            {post.categories.nodes.map((category) => (
                <Badge
                    key={category.id}
                    variant="default"
                    className="text-xs"
                >
                  {category.name}
                </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {post.featuredImage && (
                <div
                    className="h-48 bg-accent w-full overflow-hidden relative rounded-md border flex items-center justify-center">
                  <Image
                      className="h-full w-full object-cover"
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      width={400}
                      height={200}
                  />
                </div>
            )}

            <div
                className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all">
              {post.title}
            </div>

            <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.split(" ").slice(0, 12).join(" ").trim() + "..."
                }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <hr/>

            <div className="flex justify-between items-center text-xs">
              <ul>
                {post.tags.nodes.map((tag) => (
                    <li
                        key={tag.id}
                        className="text-xs"
                    >
                      {`#${tag.name}`}
                    </li>
                ))}
              </ul>
              <p>{date}</p>
            </div>
          </div>
        </Link>
    );
  }
