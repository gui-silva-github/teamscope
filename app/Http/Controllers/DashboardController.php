<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Employee;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("dashboard", [
            'employeesCount' => Employee::count(),
            'projectsCount' => Project::count(),
            'rolesCount' => Employee::distinct('role')->count(),
            'sumProjects' => Project::sum('price')
        ]);
    }
}
