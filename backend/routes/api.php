<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\AuthController;


Route::apiResource(
    'todos',
    TodoController::class
);

Route::post(
    '/register',

    [AuthController::class, 'register']

);

Route::post(
    '/login',

    [AuthController::class, 'login']

);
