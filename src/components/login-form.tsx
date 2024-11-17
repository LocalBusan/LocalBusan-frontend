"use client"
import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



interface loginFormData {
  email : string,
  password : string
}
interface loginErrorData {
  emailError : string | null,
  passwordError : string | null,
  commonError : string | null
}

export function LoginForm() {
  const [loginFormData,setLoginFormData] = useState<loginFormData>({email:'', password:''});
  const [errorData,setErrorData] = useState<loginErrorData>({emailError:null, passwordError:null, commonError:null});
  let errorText:string|null = null;
  
  if (errorData.emailError == 'EMPTY') {
    errorText = "이메일을 입력해주세요!";
  }
  if (errorData.passwordError == 'EMPTY') {
    errorText = "비밀번호를 입력해주세요!";
  }
  if (errorData.commonError == 'INVALID') {
    errorText = "이메일 또는 비밀번호를 확인해주세요!";
  }
  

  const onEmailInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if  (e.currentTarget === undefined) return;
    setLoginFormData({...loginFormData, email:e.currentTarget.value});  
  } 

  const onPasswordInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if  (e.currentTarget === undefined) return;
    setLoginFormData({...loginFormData, password:e.currentTarget.value});  
  }

  async function requestLogin(loginFormData:loginFormData) {
    const response = await fetch('APilogin',{
      method:'POST',
      body : JSON.stringify(loginFormData)
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }

  const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {email,password} = loginFormData;
    const nowErrorData:loginErrorData = {emailError:null, passwordError:null, commonError:null};
    if (email === '') {
      nowErrorData.emailError = 'EMPTY';
    }
    if (password === '') {
      nowErrorData.passwordError = 'EMPTY';
    }
    
    setErrorData(nowErrorData);
    if (!errorData.passwordError || !errorData.emailError ) {
      return;
    }
    requestLogin(loginFormData);
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
            로그인을 위해 이메일과 비밀번호를 입력해주세요!
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
              className={errorData.emailError ? 'focus-visible:ring-red-600 border-red-600' : ''}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">비밀번호</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                비밀번호 찾기
              </Link>
            </div>
            <Input id="password" type="password" onChange={onPasswordInputChange} className={errorData.passwordError ? 'focus-visible:ring-red-600 border-red-600' : ''} required />
          </div>
          { errorText ? <p className="text-xs text-red-600">{errorText}</p> : ''}
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            로그인
          </Button>
          <Button variant="outline" className="w-full" >
            Google 계정으로 로그인
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/signup" className="underline">
            회원가입
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
