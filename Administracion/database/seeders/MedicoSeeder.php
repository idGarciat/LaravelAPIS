<?php

namespace Database\Seeders;

use App\Models\Medico;
use App\Models\Especialidad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $especialidades = Especialidad::all();

        // Create one medico per especialidad for the first 10 especialidades
        $count = 0;
        foreach ($especialidades as $esp) {
            Medico::factory()->create([
                'especialidad_id' => $esp->id,
            ]);

            $count++;
            if ($count >= 10) {
                return;
            }
        }

        // If there were fewer than 10 especialidades, create remaining medicos with random especialidades
        if ($count < 10) {
            Medico::factory()->count(10 - $count)->create();
        }
    }
}
