<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IDMaker extends Model
{	
    protected $guarded = ['id'];

    protected $table = 'id_makers';

    public $timestamps = false;
}

