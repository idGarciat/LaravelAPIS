<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Especialidad;
use App\Models\Medico;
use App\Models\Paciente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->call([
            EspecialidadSeeder::class,
            MedicoSeeder::class,
            //MedicoSeeder::class,
            PacienteSeeder::class,
        ]);

        
    }
}
