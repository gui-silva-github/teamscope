import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { Toaster, toast } from "sonner"

interface Employee {
    id?: number,
    picture: string,
    name: string,
    email: string,
    role: string,
    github: string,
    linkedin: string
}

interface Props {
    isOpen: boolean,
    closeModal: () => void;
    employee?: Employee | null
}

export default function EmployeeFormModal({isOpen, closeModal, employee}: Props){

    const [formData, setFormData] = useState<Employee>({ picture: "", name: "", email: "", role: "", github: "", linkedin: ""})

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>("")

    useEffect(() => {
        if (employee){
            setFormData({ picture: employee.picture || "", name: employee.name, email: employee.email, role: employee.role, github: employee.github, linkedin: employee.linkedin})
            setPreview(employee.picture || "")
            setSelectedFile(null)
        } else {
            setFormData({ picture: "", name: "", email: "", role: "", github: "", linkedin: "" })
            setPreview("")
            setSelectedFile(null)
        }
    }, [employee])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            const file = e.target.files[0]
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const successMessage = employee?.id ? "Funcionário atualizado com sucesso!" : "Funcionário inserido com sucesso!";
        const errorMessage = employee?.id ? "Falha ao atualizar funcionário!" : "Falha ao inserir funcionário!";

        const form = new FormData();
        if (selectedFile) {
            form.append("picture", selectedFile);
        }
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("role", formData.role);
        form.append("github", formData.github);
        form.append("linkedin", formData.linkedin);

        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success(successMessage);
                closeModal();
                router.reload();
            },
            onError: (errors: any) => {
                toast.error(errorMessage);
                console.error(errors);
            }
        };

        if (employee?.id) {
            form.append('_method', 'put');
            router.post(`/funcionarios/${employee.id}`, form, options);
        } else {
            router.post("/funcionarios", form, options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{employee ? "Editar funcionário" : "Inserir funcionário"}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                         <label className="block text-sm font-medium">Foto (opcional)</label>
                         <input
                         title="Foto"
                         type="file" name="picture"
                         onChange={handleFileChange} className="w-full"
                         accept="image/*" />
                    </div> {preview && (
                        <div className="mb-3">
                            <p className="text-sm mb-1">Preview de Foto:</p>
                            <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o nome do funcionário"
                            title="Nome"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o email"
                            title="Email"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Cargo</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o cargo"
                            title="Cargo"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">GitHub</label>
                        <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o link do GitHub"
                            title="GitHub"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Linkedin</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                            placeholder="Digite o link do Linkedin"
                            title="Linkedin"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{employee ? "Atualizar" : "Inserir"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
