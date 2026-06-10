import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem as NavItemType } from '@/types';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { Link } from '@inertiajs/react';
import { icons } from '@/lib/navigation-icons';

export default function NavItem({ item }: { item: NavItemType }) {
    const Icon = item.icon ? icons[item.icon as keyof typeof icons] : undefined;
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isCurrentUrl(item.href)}
                tooltip={{ children: item.title }}
            >
                <Link href={item.href} prefetch>
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
