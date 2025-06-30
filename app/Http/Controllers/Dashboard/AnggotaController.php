<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AnggotaController extends Controller
{
    public function index()
    {
        $anggota = User::with(['jabatan', 'seksi'])->get();

        return Inertia::render('dashboard/anggota', [
            'anggota' => $anggota,
            'jabatan' => \App\Models\Jabatan::all(),
            'seksi' => \App\Models\Seksi::all(),
        ]);
    }   

    public function create()
    {
        return Inertia::render('dashboard/anggota/create');
    }

    public function store(Request $req)
    {
        $req->validate([
            'nama'=>'required',
            'alamat'=>'required',
            'telepon'=>'required',
            'email'=>'required|email|unique:users',
            'jenis_kelamin'=>'required',
            'id_jabatan'=>'nullable|exists:jabatans,id_jabatan',
            'id_seksi'=>'nullable',
        ]);

        $req->merge([
            'status' => 'Aktif',    
            'koordinator' => $req->id_jabatan === 5 ? true : false, // misal id_jabatan 5 adalah koordinator
            'password' => Hash::make($req->telepon), // menggunakan telepon sebagai password
            'id_seksi' => $req->id_seksi === 0 ? null : $req->id_seksi,
        ]);

        User::create($req->all());
        return redirect()->route('dashboard.anggota')->with('success','Anggota ditambahkan!');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('dashboard/anggota/edit', compact('user'));
    }

    public function update(Request $req, $id)
    {
        $user = User::findOrFail($id);
        $req->validate([
            'nama'=>'required',
            'alamat'=>'required',
            'telepon'=>'required',
            'email'=>'required|email',
            'jenis_kelamin'=>'required',
            'id_jabatan'=>'nullable|exists:jabatans,id_jabatan',
            'id_seksi'=>'nullable',
            'status'=>'required|in:Aktif,Non-aktif',
        ]);

        $data = $req->only([
            'nama',
            'alamat',
            'telepon',
            'email',
            'jenis_kelamin',
            'id_jabatan',
            'id_seksi',
            'status',
        ]);
        // if($req->filled('password')){
        //     $data['password'] = bcrypt($req->password);
        // }

        $data['id_seksi'] = $req->id_seksi === 0 ? null : $req->id_seksi;
        $data['koordinator'] = $req->id_jabatan === 5 ? true : false; // misal id_jabatan 5 adalah koordinator

        $user->update($data);
        return redirect()->route('dashboard.anggota')->with('success','Update sukses');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return back()->with('success','Dihapus');
    }
}
