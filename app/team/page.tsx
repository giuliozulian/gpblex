import {Section, Container} from "@/components/craft";
import Link from 'next/link';
import Image from 'next/image';
import {getTeamMembers} from "@/lib/wordpress";
import {TeamMember} from "@/lib/types/team";

export default async function TeamPage() {
    const teamMembers = await getTeamMembers();

    return (
        <Section>
            <Container>
                <h1 className="text-4xl font-bold mb-8">Our Team</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member: TeamMember) => (
                        <Link
                            key={member.id}
                            href={`/team/${member.slug}`}
                            className="group block"
                        >
                            {member.featuredImage?.node?.sourceUrl ? (
                                <Image
                                    src={member.featuredImage.node.sourceUrl}
                                    alt={member.featuredImage.node.altText || member.title}
                                    width={320}
                                    height={320}
                                    className="rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}

                            {member.title}
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// Metadata per SEO
export const metadata = {
    title: 'Our Team | Company Name',
    description: 'Meet our experienced team of professionals dedicated to serving our clients with expertise and excellence.',
};
