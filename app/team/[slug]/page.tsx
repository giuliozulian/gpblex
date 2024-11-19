// app/team/[slug]/page.tsx
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
            <Container>
                <Link
                    href="/team"
                    className="inline-block mb-8 text-blue-600 hover:underline"
                >
                    ← Back to Team
                </Link>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        {member.featuredImage && (
                            <img
                                src={member.featuredImage.node.sourceUrl}
                                alt={member.featuredImage.node.altText || member.title}
                                width={600}
                                height={800}
                                className="rounded-lg object-cover"
                            />
                        )}
                    </div>

                    {/* Right Column - Info */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{member.title}</h1>

                        {member.teamFields?.role && (
                            <h2 className="text-xl text-gray-600 mb-6">
                                {member.teamFields.role}
                            </h2>
                        )}

                        <div className="grid gap-6 mb-8">
                            {member.teamFields?.office && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Office</h3>
                                    <p>{member.teamFields.office}</p>
                                </div>
                            )}

                            {member.teamFields?.languages && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Languages</h3>
                                    <p>{member.teamFields.languages}</p>
                                </div>
                            )}

                            {member.teamFields?.habilitation && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Habilitation</h3>
                                    <p>{member.teamFields.habilitation}</p>
                                </div>
                            )}

                            {member.teamFields?.education && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Education</h3>
                                    <p>{member.teamFields.education}</p>
                                </div>
                            )}

                            {member.teamFields?.email && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Contact</h3>
                                    <a
                                        href={`mailto:${member.teamFields.email}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {member.teamFields.email}
                                    </a>
                                </div>
                            )}
                        </div>

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
