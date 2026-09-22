<?php

use App\Models\Categoria;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('el listado responde 200', function () {
    $this->getJson('/api/avisos')->assertStatus(200);
});
