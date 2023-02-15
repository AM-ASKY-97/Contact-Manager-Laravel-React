<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Contact::all();

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new Contact(); //Model Name

        $user->Avatar = $request->input('Avatar');
        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->user = $request->input('contact');
        $user->email = $request->input('email');

        $user->save();

        return response()->json([
            'status' => 200,
            'message' => "User Addedd Successfully"
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Contact::find($id);

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Contact::find($id); //Model Name

        $user->Avatar = $request->input('Avatar');
        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->user = $request->input('contact');
        $user->email = $request->input('email');

        $user->update();

        return response()->json([
            'status' => 200,
            'message' => "User Update Successfully"
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Contact::find($id);

        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => "User Deleted Successfully"
        ]);

    }
}
