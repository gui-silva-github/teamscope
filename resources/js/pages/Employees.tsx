import { useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import EmployeeFormModal from "../components/EmployeeFormModal"
import AppLayout from "@/layouts/app-layout"
import { Toaster, toast } from "sonner"
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Employees(){

    const { employees } = usePage<{ employees: {id: number; picture: string; name: string; email: string; role: string; github: string; linkedin: string }[]}>().props

    const [isModalOpen, setIsModalOpen] = useState(false)

    type Employee = { id: number; picture: string; name: string; email: string, role: string; github: string, linkedin: string }
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const openModal = (employee: Employee | null = null) => {
        setSelectedEmployee(employee)
        setIsModalOpen(true)
    }

    const handleDelete = (id: number) => {
        if (!confirm("Tem certeza que deseja remover este funcionário?")) return

        router.delete(`/funcionarios/${id}`, {
            onSuccess: () => {
                toast.success("Funcionário removido com sucesso!")
                router.reload()
            },
            onError: () => {
                toast.success("Falha ao remover funcionário!")
                console.error("Falha ao remover funcionário!")
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Funcionários"/>
            <Toaster position="top-right" richColors/>
            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
                <div className="flex justify-end">
                    <button
                        onClick={() => openModal()}
                        className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        title="Adicionar novo funcionário"
                        aria-label="Adicionar novo funcionário"
                    >
                        Adicionar Funcionário
                    </button>
                </div>
                <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 border-b">
                            {["Foto", "Nome", "Email", "Cargo", "GitHub", "Linkedin", "Ações"].map((header) => (
                                <th key={header} className="border p-3 text-left">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length ? (
                            employees.map((employee) => (
                                <tr key={employee.id} className="border-b">
                                    <td className="p-3">
                                        {employee.picture ? <img src={employee.picture} alt={employee.name} className="w-16 h-16 object-cover rounded-full" /> : "Sem imagem"}
                                    </td>
                                    <td className="p-3">
                                        {employee.name}
                                    </td>
                                    <td className="p-3">
                                        {employee.email}
                                    </td>
                                    <td className="p-3">
                                        {employee.role}
                                    </td>
                                    <td className="p-3">
                                        <a href={employee.github} title="github"><FaGithub size={30}/></a>
                                    </td>
                                    <td className="p-3">
                                        <a href={employee.linkedin} title="linkedin"><FaLinkedin size={30}/></a>
                                    </td>
                                    <td>
                                        <button onClick={() => openModal(employee)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded m-2">Editar</button>
                                        <button onClick={() => handleDelete(employee.id)} className="bg-red-500 text-sm text-white px-3 py-1 rounded">Remover</button>
                                    </td>
                                </tr>
                            ))
                        )
                        : (
                            <tr><td colSpan={7} className="text-center p-4 text-gray-600">Nenhum funcionário encontrado.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <EmployeeFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} employee={selectedEmployee}/>
        </AppLayout>
    )

}
