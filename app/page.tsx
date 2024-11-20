import { getFrontPage } from '@/lib/wordpress';
import { Section, Container } from "@/components/craft";
import Image from "next/image";

export default async function Page() {
    try {
        const node = await getFrontPage();

        if (!node) {
            return (
                <Section>
                    <Container>
                        <p>Front page not found</p>
                    </Container>
                </Section>
            );
        }

        // Se è una Page
        if (node.__typename === 'Page') {
            return (
                <Section>
                    <Container>
                        <h1 className="text-4xl font-bold mb-6">
                            {node.title}
                        </h1>

                        {node.featuredImage && (
                            <div className="mb-8">
                                <Image
                                    width={400}
                                    height={400}
                                    src={node.featuredImage.node.sourceUrl}
                                    alt={node.featuredImage.node.altText || ''}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        )}

                        {node.content && (
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: node.content }}
                            />
                        )}
                    </Container>
                </Section>
            );
        }

        // Se è un ContentType
        if (node.__typename === 'ContentType') {
            return (
                <Section>
                    <Container>
                        <h1 className="text-4xl font-bold mb-6">
                            {node.name}
                        </h1>
                    </Container>
                </Section>
            );
        }

        return (
            <Section>
                <Container>
                    <p>Invalid content type</p>
                </Container>
            </Section>
        );
    } catch (error) {
        return (
            <Section>
                <Container>
                    <p>Error loading front page content</p>
                </Container>
            </Section>
        );
    }
}
