"use client"
import Link from "next/link"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation";



interface signupFormData {
  email : string,
  nickname : string,
  password : string,
  regionId : number
}
interface signupErrorData {
  emailError : string | null,
  passwordError : string | null,
  nicknameError : string | null,
  commonError : string | null
}
interface regionData {
  name : string,
  value : number
}

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

export function SignupForm() {
  const [signupFormData,setSignupFormData] = useState<signupFormData>({email:'', password:'',nickname:'',regionId:0});
  const [errorData,setErrorData] = useState<signupErrorData>({emailError:null, passwordError:null, commonError:null, nicknameError :null});
  let errorText:string|null = null;
  if (errorData.nicknameError == 'EMPTY') {
    errorText = "별명을 입력해주세요!";
  }
  if (errorData.passwordError == 'EMPTY') {
    errorText = "비밀번호를 입력해주세요!";
  }
  if (errorData.emailError == 'EMPTY') {
    errorText = "이메일을 입력해주세요!";
  }
  if (errorData.commonError == 'NETWORK') {
    errorText = "회원가입에 실패했습니다. 나중에 다시 시도해주세요!";
  }
  
  
  const onEmailInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if  (e.currentTarget === undefined) return;
    setSignupFormData({...signupFormData, email:e.currentTarget.value});  
  } 
  const onPasswordInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if  (e.currentTarget === undefined) return;
    setSignupFormData({...signupFormData, password:e.currentTarget.value});  
  }
  const onNicknameInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if  (e.currentTarget === undefined) return;
    setSignupFormData({...signupFormData, nickname:e.currentTarget.value});  
  }
  const onRegionInputChange = (value : string) => {
    setSignupFormData({...signupFormData, regionId:parseInt(value)});  
  }
  
  async function requestSignup(signupFormData:signupFormData) {
    const response = await fetch('http://3.34.225.212:8080/api/users',{
      method:'POST',
      cache :'no-store',
      body : JSON.stringify({
        email : signupFormData.email,
        password : signupFormData.password,
        region_id : signupFormData.regionId,
        nickname : signupFormData.nickname,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  }
  const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {email,password,nickname,regionId} = signupFormData;
    const nowErrorData:signupErrorData = {emailError:null, passwordError:null, nicknameError : null ,commonError:null};
    if (email === '') {
      nowErrorData.emailError = 'EMPTY';
    }
    if (password === '') {
      nowErrorData.passwordError = 'EMPTY';
    }
    if (nickname === '') {
      nowErrorData.nicknameError = 'EMPTY';
    }
    
    setErrorData(nowErrorData);
    if (nowErrorData.passwordError || nowErrorData.emailError || nowErrorData.nicknameError) {
      return;
    }
    const loginResponse = await requestSignup(signupFormData);
    if (loginResponse.status !== 201) {
      setErrorData({...nowErrorData, commonError:'NETWORK'});
    }
    else {
      redirect('/login');
    }
     
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>
            회원가입을 위해 이메일,비밀번호, 별명을 입력해주세요!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              onChange={onEmailInputChange}
              className={(errorData.emailError || errorData.commonError) ? 'focus-visible:ring-red-600 border-red-600' : ''}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">비밀번호</Label>
            </div>
            <Input id="password" type="password" onChange={onPasswordInputChange} className={(errorData.passwordError || errorData.commonError) ? 'focus-visible:ring-red-600 border-red-600' : ''} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="nickname">별명</Label>
            </div>
            <Input id="nickname" type="text" onChange={onNicknameInputChange} className={(errorData.nicknameError || errorData.commonError) ? 'focus-visible:ring-red-600 border-red-600' : ''} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
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
          { errorText ? <p className="text-xs text-red-600">{errorText}</p> : ''}
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            회원가입
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline">
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
