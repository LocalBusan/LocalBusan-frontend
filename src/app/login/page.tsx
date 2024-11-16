import { LoginForm } from "@/components/login-form"
import {Logo} from "@/components/logo";
export default function Page() {
  return (
      <div className="flex flex-col gap-y-10 h-screen w-full items-center justify-center px-4">
        <Logo/>
        <LoginForm />
      </div>
  )
}
