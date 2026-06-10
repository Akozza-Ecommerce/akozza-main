import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from '@/components/ui/sidebar';
import type { NavItem as NavItemType } from '@/types';
import NavItem from './nav-item';

export function NavMain({ items = [] }: { items: NavItemType[] }) {

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
