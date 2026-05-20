<?php

namespace Database\Seeders;

use App\Models\Especialidad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EspecialidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Especialidad::create([
            'nombre' => 'Pediatría',
            'descripcion' => 'Descripcion de Pediatria xd',
        ]);

        Especialidad::create([
            'nombre' => 'Cardiología',
            'descripcion' => 'Descripcion de Cardiologia xd',
        ]);

        Especialidad::create([
            'nombre' => 'Odontología,',
            'descripcion' => 'Descripcion de Odontologia xd',
        ]);

        Especialidad::create([
            'nombre' => 'Ginecología,',
            'descripcion' => 'Descripcion de Ginecologia xd',
        ]);

        Especialidad::create([
            'nombre' => 'Medicina General',
            'descripcion' => 'Descripcion de Medicina General xd',
        ]);

    }
}
