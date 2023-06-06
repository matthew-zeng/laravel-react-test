<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UpdateUserController extends Controller
{   
    public function update(Request $request, string $id)
    {   
        $record = User::find($id);
        if (!$record) {
            // Handle case when the record is not found
            // Return an error response or redirect, depending on your requirements
            return response()->json(['message' => 'Record not found'], 404);
        }
        $record->update($request->all());
        return $record;
    }
}