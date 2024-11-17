import Image from "next/image";
import Link from "next/link";
export function Logo() {
    return (
        <Link href="/">
            <Image priority={true} src="./logo.svg" height={85} width={219} alt="로컬부산 로고"/>
        </Link>
    );
}