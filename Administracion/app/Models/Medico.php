<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Medico extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_completo',
        'especialidad_id',
        'telefono',
        'email',
        'estado',
    ];

    public function especialidad(): BelongsTo
    {
        return $this->belongsTo(Especialidad::class);
    }
}
