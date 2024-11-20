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
    description: page?.excerpt?.rendered || page?.excerpt, // fallback in case excerpt is just a string
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  console.log(page)
  if(!page){
    return <NotFound/>
  }

  return (
    <Section>
      <Container>
        <BackButton />
        <h1 className="pt-12">{page?.title}</h1>
      </Container>
    </Section>
  );
}
