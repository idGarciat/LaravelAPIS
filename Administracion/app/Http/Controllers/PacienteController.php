<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PacienteController extends Controller
{
    public function index()
    {
        return response()->json(Paciente::all());
    }

    public function show(Paciente $paciente)
    {
        return response()->json($paciente);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'email' => 'required|email|unique:pacientes,email',
            'telefono' => 'required|string|max:50',
            'direccion' => 'nullable|string',
            'fecha_nacimiento' => 'required|date',
            'tipo_paciente' => ['required', Rule::in(['nuevo','recurrente'])],
        ]);

        $paciente = Paciente::create($data);

        return response()->json($paciente, 201);
    }

    public function update(Request $request, Paciente $paciente)
    {
        $data = $request->validate([
            'nombre_completo' => 'sometimes|required|string|max:255',
            'email' => ['sometimes','required','email', Rule::unique('pacientes','email')->ignore($paciente->id)],
            'telefono' => 'sometimes|required|string|max:50',
            'direccion' => 'nullable|string',
            'fecha_nacimiento' => 'sometimes|required|date',
            'tipo_paciente' => ['sometimes','required', Rule::in(['nuevo','recurrente'])],
        ]);

        $paciente->update($data);

        return response()->json($paciente);
    }

    public function destroy(Paciente $paciente)
    {
        $paciente->delete();
        return response()->noContent();
    }
}
