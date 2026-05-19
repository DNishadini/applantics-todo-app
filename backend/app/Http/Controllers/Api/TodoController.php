<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;


class TodoController extends Controller
{
    public function index()
    {
        return Todo::latest()->get();
    }

    public function store(Request $request)
    {
        return Todo::create($request->all());
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return $todo;
    }

    public function destroy($id)
    {
        Todo::findOrFail($id)->delete();
        return response()->json(["message" => "Deleted successfully"]);
    }
}
