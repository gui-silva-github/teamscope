import { useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import ProjectFormModal from "../components/ProjectFormModal"
import AppLayout from "@/layouts/app-layout"
import { Toaster, toast } from "sonner"

export default function Projects(){

    const { projects } = usePage<{ projects: {id: number; title: string; description: string; price: number; due_date: string}[]}>().props

    const [isModalOpen, setIsModalOpen] = useState(false)

    type Project = { id: number; title: string; description: string; price: number; due_date: string };
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const openModal = (project: Project | null = null) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const handleDelete = (id: number) => {
        if (!confirm("Tem certeza que deseja deletar este projeto?")) return;

        router.delete(`/projetos/${id}`, {
            onSuccess: () => {
                toast.success("Projeto deletado com sucesso!")
                router.reload()
            },
            onError: () => {
                toast.success("Falha ao deletar projeto!")
                console.error("Falha ao deletar projeto!")
            },
        })
    }

    return (
        <AppLayout>
            <Head title="Projetos" />
            <Toaster position="top-right" richColors/>
            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
                <div className="flex justify-end">
                    <button
                        onClick={() => openModal()}
                        className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        title="Adicionar novo projeto"
                        aria-label="Adicionar novo projeto"
                    >
                        Adicionar Projeto
                    </button>
                </div>
                <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 border-b">
                            {["Título", "Descrição", "Preço", "Data de Entrega", "Ações"].map((header) => (
                                <th key={header} className="border p-3 text-left">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length ? (
                            projects.map((project) => (
                                    <tr key={project.id} className="border-b">
                                        <td className="p-3">
                                            {project.title}
                                        </td>
                                        <td className="p-3">
                                            {project.description}
                                        </td>
                                        <td className="p-3">
                                            {project.price}
                                        </td>
                                        <td className="p-3">
                                           {new Date(project.due_date).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td>
                                            <button onClick={() => openModal(project)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded m-2">Editar</button>
                                            <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-sm text-white px-3 py-1 rounded">Deletar</button>
                                        </td>
                                    </tr>
                            ))
                            )
                            : (
                                <tr><td colSpan={4} className="text-center p-4 text-gray-600">Nenhum projeto encontrado.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ProjectFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} project={selectedProject}/>
        </AppLayout>
    )
}




