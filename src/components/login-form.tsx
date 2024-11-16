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

export function LoginForm() {
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
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <Button variant="outline" className="w-full">
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
