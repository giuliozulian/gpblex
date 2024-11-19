import {Section, Container} from "@/components/craft";
import Image from 'next/image';
import Link from 'next/link';
import {getTeamMembers} from "@/lib/wordpress";
import {TeamMember} from "@/lib/types";

export default async function TeamPage() {
    const teamMembers = await getTeamMembers();

    return (
        <Section>
            <Container>
                <h1 className="text-4xl font-bold mb-12">Our Team</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member: TeamMember) => (
                        <Link
                            key={member.id}
                            href={`/team/${member.slug}`}
                            className="group block"
                        >
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
