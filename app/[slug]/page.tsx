import { getPageBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";

import BackButton from "@/components/back";
import NotFound from "@/app/not-found";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  return {
    title: page?.title.rendered,
    description: page?.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if(!page){
    return <NotFound/>
  }

  return (
    <Section>
      <Container>
        <BackButton />
        <h1 className="pt-12">{page?.title.rendered}</h1>
      </Container>
    </Section>
  );
}
