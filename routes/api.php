<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\LevelController;
use App\Http\Controllers\API\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('ambildatalevel', [LevelController::class, 'index']);

//user
Route::post('create_user', [UserController::class, 'store']);
Route::get('ambildatauser', [UserController::class, 'index']);

//menyimpulkan route
// Route::apiResource([
//     'user' => UserController::class,
// ]);

