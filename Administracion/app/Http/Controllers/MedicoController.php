<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MedicoController extends Controller
{
    public function index()
    {
        return response()->json(Medico::with('especialidad')->get());
    }

    public function show(Medico $medico)
    {
        $medico->load('especialidad');
        return response()->json($medico);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'especialidad_id' => 'required|exists:especialidads,id',
            'telefono' => 'required|string|max:50',
            'email' => 'required|email|unique:medicos,email',
            'estado' => ['required', Rule::in(['activo','inactivo'])],
        ]);

        $medico = Medico::create($data);

        return response()->json($medico, 201);
    }

    public function update(Request $request, Medico $medico)
    {
        $data = $request->validate([
            'nombre_completo' => 'sometimes|required|string|max:255',
            'especialidad_id' => 'sometimes|required|exists:especialidads,id',
            'telefono' => 'sometimes|required|string|max:50',
            'email' => ['sometimes','required','email', Rule::unique('medicos','email')->ignore($medico->id)],
            'estado' => ['sometimes','required', Rule::in(['activo','inactivo'])],
        ]);

        $medico->update($data);

        return response()->json($medico);
    }

    public function destroy(Medico $medico)
    {
        $medico->delete();
        return response()->noContent();
    }
}
