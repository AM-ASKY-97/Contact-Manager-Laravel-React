<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $imageName = Str::random(32).".".$request->Avatar->getClientOriginalExtension();

        $user = new Contact(); //Model Name

        $user->Avatar = $imageName;
        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->contact = $request->input('contact');
        $user->email = $request->input('email');

        // Save Image in Storage folder
        Storage::disk('public')->put($imageName, file_get_contents($request->Avatar));

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

        $user = Contact::find($id);

        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->contact = $request->input('contact');
        $user->email = $request->input('email');

        if($request->Avatar) {
            // Public storage
            $storage = Storage::disk('public');

            // Old iamge delete
            if($storage->exists($user->Avatar))
                $storage->delete($user->Avatar);

            // Image name
            $imageName = Str::random(32).".".$request->Avatar->getClientOriginalExtension();
            $user->Avatar = $imageName;

            // Image save in public folder
            $storage->put($imageName, file_get_contents($request->Avatar));
        }

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
