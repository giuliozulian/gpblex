import type {Metadata} from "next";
import {Space_Grotesk as FontSans} from "next/font/google";
import {ThemeProvider} from "@/components/theme/theme-provider";
import {Analytics} from "@vercel/analytics/react";

import "./globals.css";

import {MobileNav} from "@/components/nav/mobile-nav";
import {ThemeToggle} from "@/components/theme/theme-toggle";
import {Main} from "@/components/craft";
import {mainMenu, contentMenu} from "@/menu.config";
import {Section, Container} from "@/components/craft";
import Balancer from "react-wrap-balancer";
import NextTopLoader from 'nextjs-toploader';

import Logo from "@/public/logo.svg";

import Image from "next/image";
import Link from "next/link";

import {cn} from "@/lib/utils/utils";
import ApolloWrapper from "@/components/apolloWrapper";
import SimpleMenu from "@/components/nav/navigation";
import {NavProps} from "@/lib/types/menu";
import Search from "@/components/search/search";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "WordPress & Next.js Starter by 9d8",
    description:
        "A starter template for Next.js with WordPress as a headless CMS.",
    metadataBase: new URL("https://wp.9d8.dev"),
};

import { twConfig } from '@/lib/tw-config';
const accentColor = twConfig.theme.colors.accent;

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" suppressHydrationWarning>
        <head/>
        <body
            className={cn("min-h-screen font-sans antialiased bg-background", fontSans.variable)}
        >
        <ApolloWrapper>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NextTopLoader
                    color={accentColor.DEFAULT}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                <Nav />
                <Main>{children}</Main>
                <Footer/>
            </ThemeProvider>
        </ApolloWrapper>
        <Analytics/>
        </body>
        </html>
    );
}

const Nav = async ({className, children, id}: NavProps) => {
    return (
        <nav
            className={cn(
                "sticky z-50 top-0 bg-background",
                "border-b",
                "fade-in",
                className,
            )}
            id={id}
        >
            <div
                id="nav-container"
                className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
            >
                <Link
                    className="hover:opacity-75 transition-all flex gap-2 items-center"
                    href="/"
                >
                    <h2 className="sr-only">next-wp starter</h2>
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="dark:invert"
                        width={84}
                        height={30.54}
                    ></Image>
                </Link>
                {children}
                <div className="flex items-center gap-2">
                    <SimpleMenu/>
                    <Search/>
                    <MobileNav/>
                </div>
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer>
            <Section>
                <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
                    <div className="flex flex-col gap-6 not-prose">
                        <Link href="/">
                            <h3 className="sr-only">brijr/components</h3>
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={120}
                                height={27.27}
                                className="dark:invert hover:opacity-75 transition-all"
                            ></Image>
                        </Link>
                        <p>
                            <Balancer>{metadata.description}</Balancer>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <h5 className="font-medium text-base">Website</h5>
                        {Object.entries(mainMenu).map(([key, href]) => (
                            <Link
                                className="hover:underline underline-offset-4"
                                key={href}
                                href={href}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <h5 className="font-medium text-base">Blog</h5>
                        {Object.entries(contentMenu).map(([key, href]) => (
                            <Link
                                className="hover:underline underline-offset-4"
                                key={href}
                                href={href}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                    </div>
                </Container>
                <Container
                    className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
                    <ThemeToggle/>
                    <p className="text-muted-foreground">
                        © <a href="https://9d8.dev">9d8</a>. All rights reserved.
                        2024-present.
                    </p>
                </Container>
            </Section>
        </footer>
    );
};
