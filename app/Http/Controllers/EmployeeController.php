<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Employees', [
            'employees' => Employee::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'picture' => 'nullable|image|max:2048',
            'name' => 'required|max:255',
            'email' => 'required',
            'role' => 'required',
            'github' => 'required',
            'linkedin' => 'required'
        ]);

        $data = $request->only(['name', 'email', 'role', 'github', 'linkedin']);
        if ($request->hasFile('picture')){
            $file = $request->file('picture');
            $filename = time(). '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/'.$path;
        }

        Employee::create($data);
        return redirect()->route('funcionarios.index')->with('success', 'Funcionário inserido com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $funcionario)
    {
         $request->validate([
            'picture' => 'nullable|image|max:2048',
            'name' => 'required|max:255',
            'email' => 'required',
            'role' => 'required',
            'github' => 'required',
            'linkedin' => 'required'
        ]);

        $data = $request->only(['name', 'email', 'role', 'github', 'linkedin']);
        if ($request->hasFile('picture')){
            $file = $request->file('picture');
            $filename = time(). '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/'.$path;
        }

        $funcionario->update($data);
        return redirect()->route('funcionarios.index')->with('success', 'Funcionário atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $funcionario)
    {
        $funcionario->delete();
        return redirect()->route('funcionarios.index')->with('success', 'Funcionário removido com sucesso!');
    }
}
