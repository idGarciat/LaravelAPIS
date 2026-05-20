<?php

namespace App\Http\Controllers;

use App\Models\Especialidad;
use Illuminate\Http\Request;

class EspecialidadController extends Controller
{
    public function index()
    {
        return response()->json(Especialidad::all());
    }

    public function show(Especialidad $especialidad)
    {
        return response()->json($especialidad);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $especialidad = Especialidad::create($data);

        return response()->json($especialidad, 201);
    }

    public function update(Request $request, Especialidad $especialidad)
    {
        $data = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $especialidad->update($data);

        return response()->json($especialidad);
    }

    public function destroy(Especialidad $especialidad)
    {
        $especialidad->delete();
        return response()->noContent();
    }
}
