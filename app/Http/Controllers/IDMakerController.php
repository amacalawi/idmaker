<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\IDMaker;
use Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\File;
Use DB; 

class IDMakerController extends Controller
{
    
    public function __construct()
    {
        date_default_timezone_set('Asia/Manila');
    }
    
    private function config() 
    {
        $config = (object) array(
            'url' => '192.168.1.200',
            'restriction' => 0
        );

        return $config;
    }

    public function store(Request $request)
    {   
        $timestamp = date('Y-m-d H:i:s');

        $rows = IDMaker::where([
            'identification_no' => $request->identification_no
        ])->get();

        $filename = $this->uploads($_FILES, $request->identification_no);
        if ($rows->count() > 0) {
            $idMaker = IDMaker::find($rows->first()->id);

            if(!$idMaker) {
                throw new NotFoundHttpException();
            }

            $idMaker->firstname = $request->firstname;
            $idMaker->middlename = $request->middlename;
            $idMaker->lastname = $request->lastname;
            $idMaker->gender = $request->gender;
            $idMaker->avatar = $filename;
            $idMaker->updated_at = $timestamp;

            if ($idMaker->update()) {
                $data = array(
                    'title' => 'Well done!',
                    'text' => 'The information has been successfully updated.',
                    'type' => 'success',
                    'class' => 'btn-brand'
                );
        
                echo json_encode( $data ); exit();
            }
        } else {
            $idMaker = IDMaker::create([
                'identification_no' => $request->identification_no,
                'firstname' => $request->firstname,
                'middlename' => $request->middlename,
                'lastname' => $request->lastname,
                'gender' => $request->gender,
                'avatar' => $filename,
                'created_at' => $timestamp,
            ]);

            if (!$idMaker) {
                throw new NotFoundHttpException();
            }

            $data = array(
                'title' => 'Well done!',
                'text' => 'The information has been successfully upload.',
                'type' => 'success',
                'class' => 'btn-brand'
            );

            echo json_encode( $data ); exit();
        }
    }

    public function uploads($FILES, $IDNo)
    {
        $files = array();

        foreach($FILES as $file)
        {   
            $filename = $IDNo;
            $files[] = Storage::disk('uploads')->put($filename, (string) file_get_contents($file['tmp_name']));
        }

        return $filename;
    }
}