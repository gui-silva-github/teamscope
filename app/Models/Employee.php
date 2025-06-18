<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'picture',
        'name',
        'email',
        'role',
        'github',
        'linkedin'
    ];
}
