import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    employeesCount: number;
    projectsCount: number;
    rolesCount: number;
    sumProjects: number
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ employeesCount, projectsCount, rolesCount, sumProjects }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-white">Funcionários</h2>
                        <p className="text-4xl font-semibold mt-2">{employeesCount}</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-white">Cargos</h2>
                        <p className="text-4xl font-semibold mt-2">{rolesCount}</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-white">Projetos</h2>
                        <p className="text-4xl font-semibold mt-2">{projectsCount}</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-white">Soma total</h2>
                        <p className="text-4xl font-semibold mt-2">{sumProjects}</p>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
