<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        //$imageName = Str::random(32).".".$request->Avatar->getClientOriginalExtension();

        $validator = Validator::make($request->all(), [
            'firstName' => 'required',
            'lastName' => 'required',
            'contact' => 'required|max:10|min:10',
            'email' => 'required|email|unique:contacts',
            'Avatar' => 'required|image',
            'address' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_error' => $validator->messages()
            ]);
        } else {
            $user = new Contact(); //Model Name

            //$user->Avatar = $imageName;
            $user->firstName = $request->input('firstName');
            $user->lastName = $request->input('lastName');
            $user->contact = $request->input('contact');
            $user->email = $request->input('email');
            $user->address = $request->input('address');

            // Save Image in Storage folder
            //Storage::disk('public')->put($imageName, file_get_contents($request->Avatar));

            if ($request->hasfile('Avatar')) {
                $file = $request->file('Avatar');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $file->move('upload/students/', $filename);
                $user->Avatar = $filename;
            }

            $user->save();

            return response()->json([
                'status' => 200,
                'message' => "User Addedd Successfully"
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Contact::find($id);

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Contact::find($id);

        if($user)
        {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ]);
        }

        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No Student ID Found",
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'firstName' => 'required',
            'lastName' => 'required',
            'contact' => 'required|max:10|min:10',
            'address' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_error' => $validator->messages()
        ]);

        } else {
            $user = Contact::find($id);

            $user->firstName = $request->input('firstName');
            $user->lastName = $request->input('lastName');
            $user->contact = $request->input('contact');
            $user->address = $request->input('address');

            if ($request->hasfile('Avatar')) {
                $file = $request->file('Avatar');
                $extention = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extention;
                $file->move('upload/students/', $filename);
                $user->Avatar = $filename;
            }


            $user->update();

            return response()->json([
                'status' => 200,
                'message' => "Record Updated Successfully"
            ]);
        }
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
