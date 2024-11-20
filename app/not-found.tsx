'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Container } from "@/components/craft"

export default function NotFound() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-9xl font-bold text-accent mt-4">404</div>

                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-4">
                        Oops! Pagina non trovata
                    </h2>

                    <p className="text-muted-foreground mb-8">
                        La pagina che stai cercando potrebbe essere stata spostata, eliminata o potrebbe non essere mai esistita.
                    </p>

                    <div className="flex gap-4 justify-center">

                        <Button asChild variant="outline">
                            <Link href="/"
                                className="mt-4">
                                Torna in homepage
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}
