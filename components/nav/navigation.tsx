'use client';

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import {GET_PRIMARY_MENU} from "@/lib/queries";

export default function SimpleMenu() {
    const { data, loading, error } = useQuery(GET_PRIMARY_MENU);

    if (loading) return <div>Loading...</div>;

    const menuItems = data?.menus?.nodes[0]?.menuItems?.nodes || [];
    const firstLevelItems = menuItems.filter((item: any) => !item.parentId);

    return (
        <nav>
            <ul className="flex items-center gap-6 px-4 py-3">
                {firstLevelItems.map((item: any) => (
                    <li key={item.id}>
                        <Link href={item.path}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
