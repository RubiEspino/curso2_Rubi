<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/avisos', [PostController::class, 'index']);
Route::get('/avisos/{post}', [PostController::class, 'show']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/avisos', [PostController::class, 'store']);
    Route::put('/avisos/{post}', [PostController::class, 'update']);
    Route::delete('/avisos/{post}', [PostController::class, 'destroy']);
});
Route::get('/resumen', [PostController::class, 'resumen']);