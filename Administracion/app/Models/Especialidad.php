<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Especialidad extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function medicos(): HasMany
    {
        return $this->hasMany(Medico::class);
    }
}
