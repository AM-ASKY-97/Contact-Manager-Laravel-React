<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('index', [ContactController::class, 'index']);
Route::post('store', [ContactController::class, 'store']);
Route::get('edit/{id}', [ContactController::class, 'edit']);
Route::put('update/{id}', [ContactController::class, 'update']);
Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
Route::get('show/{id}', [ContactController::class, 'show']);
