<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::resource('projetos', ProjectController::class);

Route::resource('funcionarios', EmployeeController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
