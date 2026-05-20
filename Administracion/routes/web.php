<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\EspecialidadController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('pacientes', PacienteController::class);
Route::resource('medicos', MedicoController::class);
Route::resource('especialidades', EspecialidadController::class);
