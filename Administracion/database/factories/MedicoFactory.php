<?php

namespace Database\Factories;

use App\Models\Medico;
use App\Models\Especialidad;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Medico>
 */
class MedicoFactory extends Factory
{
    protected $model = Medico::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $especialidadId = Especialidad::inRandomOrder()->value('id');

        return [
            'nombre_completo' => $this->faker->name(),
            'especialidad_id' => $especialidadId ?? 1,
            'telefono' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'estado' => $this->faker->randomElement(['Activo', 'Inactivo']),
        ];
    }
}
