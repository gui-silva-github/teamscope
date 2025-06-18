<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'due_date'
    ];

    protected $casts = [
    'due_date' => 'date',
    ];
}
