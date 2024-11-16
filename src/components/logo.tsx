import Image from "next/image";
export function Logo() {
    return <Image priority={true} src="./logo.svg" height={85} width={219} alt="로컬부산 로고"/>;
}