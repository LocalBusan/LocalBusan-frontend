'use client';

import { PlateEditor } from '@/components/editor/plate-editor';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/plate-ui/input';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { redirect } from 'next/navigation';
const regionArray:Array<regionData> = [
  '강서구','북구','동구','서구','남구','사하구',
  '해운대구','금정구','동래구','중구','수영구',
  '기장군','부산진구','연제구','사상구'
  ].sort().map((regionName,index)=>{
    return {
      name : regionName,
      value : index + 1
    }
  }); 
interface regionData {
  name : string,
  value : number
}

interface articleData {
  title : string,
  subtitle : string,
  content : string,
  thumbnail : string,
  categoryId : number,
  regionId : number
}
export default function Page() {
  const editor:any = useCreateEditor();
  const onRegionInputChange = (value : string) => {
    setArticleData({...articleData, regionId:parseInt(value)});  
  }
  const onCategoryInputChange = (value : string) => {
    setArticleData({...articleData, categoryId:parseInt(value)});  
  }
  const onTitleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setArticleData({...articleData, title:e.currentTarget.value});  
  }
  const onSubtitleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setArticleData({...articleData, subtitle:e.currentTarget.value});  
  }
  const onEditorChange = () => { 
    setArticleData({...articleData, content : editor.api.markdown.serialize()})
  }
  const onClickWriteButton = async () => {
    const response = await fetch('/api/boards',{
      method : 'POST',
      credentials : 'include',
      body : JSON.stringify({
        user_id : 1,
        region_id : articleData.regionId,
        category_id : articleData.categoryId,
        title : articleData.title,
        subtitle : articleData.subtitle,
        thumbnail_url : articleData.thumbnail,
        content : articleData.content 
      }),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    if (response.ok) {
      redirect('/');
    }
  }
  const [articleData,setArticleData] = useState<articleData>({title:'', subtitle:'',thumbnail:'',content:'',regionId:0,categoryId:0});
  return (
    <div className='flex flex-col items-center'>
      <div className='flex m-9 w-6/12 items-center justify-between'>
        <h1 className=' text-left text-4xl font-bold'>아티클 쓰기 페이지</h1>
        <Button onClick={onClickWriteButton}>글 작성</Button>
      </div>
      <div className='flex flex-col w-1/2 gap-3'>
      <div>
        <div>
          <Input 
            className="md:text-2xl p-0 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
            onChange={onTitleInputChange}
            placeholder='제목을 입력하세요'
            type="text"/>
        </div>
        <div>
          <Input 
            className="md:text-md  p-0 rounded-none border-0  focus-visible:ring-0 focus-visible:ring-offset-0" 
            onChange={onSubtitleInputChange}
            placeholder='부제목을 입력하세요' 
            type="text"/>
        </div>
      </div>
        <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
            <div className='m-1'>
              <Label htmlFor="region">지역 </Label>
            </div>
            <Select onValueChange={onRegionInputChange}>
              <SelectTrigger id="region" className="w-[180px]">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0" defaultValue="0">전체</SelectItem>
                {
                  regionArray.map(({name,value})=>{
                    return <SelectItem value={value.toString()} key={value}>{name}</SelectItem>;
                  })
                }
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col'>
            <div className='m-1'>
              <Label htmlFor="region">카테고리 </Label>
            </div>
            <Select onValueChange={onCategoryInputChange}>
              <SelectTrigger id="category" className="w-[180px]">
                <SelectValue placeholder="맛집" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0" defaultValue="0">맛집</SelectItem>
                <SelectItem value="1" defaultValue="0">문화</SelectItem>
                <SelectItem value="2" defaultValue="0">피플</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className='m-1 w-1/3'>
            <Label  htmlFor="thumbnail_uplaod">썸네일 </Label>
          </div>
          <Input id="thumnail_upload" type="file" className='w-1/3' required />
        </div>
      </div>
      <div className='h-6/12 w-6/12 m-8 border-2' data-registry='plate'>
        <PlateEditor onChange={onEditorChange} editor={editor}>{undefined}</PlateEditor>
      </div>
    </div>
  );
}
