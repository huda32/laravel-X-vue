<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\LevelController;
use App\Http\Controllers\API\UserController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('ambildatalevel', [LevelController::class, 'index']);

//user
Route::post('create_user', [UserController::class, 'store']);
Route::get('ambildatauser', [UserController::class, 'index']);
//harus ada tambahan /{id}
Route::put('edit_user/{id}', [UserController::class, 'update']);
Route::delete('hapus_user/{id}', [UserController::class, 'destroy']);
//menyimpulkan route

// Route::apiResource([
//     'user' => UserController::class,
// ]);

