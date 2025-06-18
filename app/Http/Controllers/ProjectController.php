<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Projects', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required',
            'due_date' => 'required'
        ]);

        $data = $request->only(['title', 'description', 'price', 'due_date']);

        Project::create($data);
        return redirect()->route('projetos.index')->with('success', 'Projeto criado com sucesso!');
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
    public function update(Request $request, Project $projeto)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required',
            'due_date' => 'required'
        ]);

        $data = $request->only(['title', 'description', 'price', 'due_date']);

        $projeto->update($data);
        return redirect()->route('projetos.index')->with('success', 'Projeto atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $projeto)
    {
        $projeto->delete();
        return redirect()->route('projetos.index')->with('success', 'Projeto deletado com sucesso!');
    }
}
