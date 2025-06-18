import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { Toaster, toast } from "sonner"

interface Project {
    id?: number,
    title: string,
    description: string,
    price: number,
    due_date: string
}

interface Props {
    isOpen: boolean,
    closeModal: () => void;
    project?: Project | null
}

export default function ProjectFormModal({isOpen, closeModal, project}: Props){

    const [formData, setFormData] = useState<Project>({ title: "", description: "", price: 0, due_date: "" })

    useEffect(() => {
        if (project){
            setFormData({ title: project.title, description: project.description, price: project.price, due_date: project.due_date })
        } else {
            setFormData({ title: "", description: "", price: 0, due_date: "" })
        }
    }, [project])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData( {...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const successMessage = project?.id ? "Projeto atualizado com sucesso!" : "Projeto criado com sucesso!"
        const errorMessage = project?.id ? "Falha ao atualizar projeto!" : "Falha ao criar projeto!"

        if (project?.id){
            router.put(`/projetos/${project.id}`, {
                title: formData.title,
                description: formData.description,
                price: formData.price.toString(),
                due_date: formData.due_date
            }, {
                onSuccess: () => {
                    toast.success(successMessage)
                    closeModal()
                    router.reload()
                },
                onError: (errors) => {
                    toast.success(errorMessage)
                    console.error(errors.message || "Falha ao enviar projeto.")
                }
            })
        } else {
            router.post("/projetos", {
                title: formData.title,
                description: formData.description,
                price: formData.price.toString(),
                due_date: formData.due_date
            }, {
                onSuccess: () => {
                    toast.success(successMessage)
                    closeModal()
                    router.reload()
                },
                onError: (errors) => {
                    toast.success(errorMessage)
                    console.error(errors.message || "Falha ao enviar projeto.")
                }
            })
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{project ? "Editar projeto" : "Adicionar projeto"}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o título do projeto"
                            title="Título"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            title="Descrição"
                            placeholder="Digite a descrição do projeto"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                         <label className="block text-sm font-medium">Preço</label>
                         <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o preço do projeto"
                            title="Preço"
                        />
                    </div>
                    <div className="mb-3">
                         <label className="block text-sm font-medium">Data de Entrega</label>
                         <input
                            type="date"
                            name="due_date"
                            value={formData.due_date ?? ""}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Selecione a data de entrega"
                            title="Data de Entrega"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{project ? "Atualizar" : "Adicionar"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
