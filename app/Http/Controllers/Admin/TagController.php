<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Tag;

class TagController extends Controller
{

    // 查询所有标签
    public function index()
    {
        $tags = Tag::all();
        $tagsArr = array();
        foreach ($tags as $tag) {
            $tag->key = $tag->id;
            array_push($tagsArr, $tag->name);
        }
        return response()->json([
            'tags' => $tags,
            'tagsArr' => $tagsArr,
        ]);
    }

    // 新增标签
    public function store(Request $request){
        if ($request->id) {
            $tag = Tag::findOrFail($request->id);
            $message = '保存成功！';
        }else{
            $tag = new Tag;
            $message = '创建成功！';
        }
        $tag->name = $request->tag_name;
        $tag->article_num = 0;
        $tag->search_num = 0;
        $tag->save();
        return response()->json([
            'message' => $message
        ]);
    }

    // 删除标签
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->articles()->detach();
        $tag->delete();
        return response()->json([
            'message' => '删除成功！'
        ]);
    }

    
}
