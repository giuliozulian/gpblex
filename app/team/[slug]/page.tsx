import {Section, Container} from "@/components/craft";
import Image from 'next/image';
import Link from 'next/link';
import {getTeamMemberBySlug} from "@/lib/wordpress";

export default async function TeamMemberPage({
                                                 params
                                             }: {
    params: { slug: string }
}) {
    const member = await getTeamMemberBySlug(params.slug);

    if (!member) {
        return (
            <Section>
                <Container>
                    <p>Team member not found</p>
                </Container>
            </Section>
        );
    }

    return (
        <Section>
            <Container className="not-prose">
                <Link
                    href="/team"
                    className="inline-block mb-8 text-accent hover:underline"
                >
                    ← Back to Team
                </Link>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        {member.featuredImage && (
                            <Image
                                src={member.featuredImage.node.sourceUrl}
                                alt={member.featuredImage.node.altText || member.title}
                                width={600}
                                height={800}
                                className="rounded-lg mt-0 object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-8">{member.title}</h1>

                        <article className="text-lg">


                        {member.teamFields?.role && (
                            <h2 className="mb-2">
                                <span className="text-foreground">Ruolo</span>: <span>{member.teamFields.role}</span>
                            </h2>
                        )}

                        {member.teamFields?.office && (
                            <h2 className="mb-2">
                                <span className="text-foreground">Sede</span>: <span>{member.teamFields.office}</span>
                            </h2>
                        )}

                        {member.teamFields?.languages && (
                            <h2 className="mb-2">
                                <span className="text-foreground">Lingue</span>: <span>{member.teamFields.languages}</span>
                            </h2>
                        )}

                        {member.teamFields?.education && (
                            <h2 className="mb-2">
                                <span className="text-foreground">Formazione</span>: <span>{member.teamFields.education}</span>
                            </h2>
                        )}
                        </article>

                        {/* Practice Areas */}
                        {member.teamFields?.practiceAreas && member.teamFields.practiceAreas.length > 0 && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-700 mb-3">Practice Areas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {member.teamFields.practiceAreas.map((area: any) => (
                                        <Link
                                            key={area.id}
                                            href={`/practice-areas/${area.slug}`}
                                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {area.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
