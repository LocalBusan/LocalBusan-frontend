
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from 'next/link';
import Markdown from 'react-markdown';
import Reply from "@/components/ui/reply";
export default async function Article({params}:{params:Promise<{id: string}>}) {

    const articleId = (await params).id;
    const response = await fetch(`http://3.34.225.212:8080/api/boards/${articleId}`,{method : 'GET',headers: {
        'Content-Type' : 'application/json'
    }})
    const fetchedJson = await response.json();
    return (
        <>
        <div className="flex justify-end gap-x-3 h-10 px-8 items-center">
            <Link href="/chat">챗봇</Link>
            <Link href="/editor">글쓰기</Link>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
        </div>
        <div className="flex flex-col items-center gap-y-3">
            <div className="w-[700px]">
                <AspectRatio ratio={16 / 9}>
                    <img src={fetchedJson.thumbnail_url} onError={({currentTarget})=>{currentTarget.src = '../alt_image.png'}} alt="Image" className="rounded-md object-cover"/>
                </AspectRatio>
            </div>
            <div className="w-[700px]">
                <div className="text-amber-800 font-bold">{fetchedJson.category.category_name} in {fetchedJson.region.region_name}</div>
                <h1 className="text-4xl font-bold" >{fetchedJson.title}</h1>
                <h2 className="text-xl text-gray-500">{fetchedJson.subtitle}</h2>
                <h3 className="text-md text-gray-500">{fetchedJson.created_at}</h3>
                
            </div>
            <div className="w-[700px]">
                <Markdown components={{
                    h1(props) {return <h1 className="text-2xl font-bold">{props.children}</h1>},
                    h2(props) {return <h2 className="text-xl font-bold">{props.children}</h2>},
                    h3(props) {return <h3 className="text-lg font-bold">{props.children}</h3>},
                    a({children, ...rest}) {return <a className="underline" {...rest}>{children}</a>},
                    img({...rest}) {return <span className="flex justify-center"><img {...rest}/></span>},
                    ul({children}) {return <ul className="list-disc">{children}</ul>},
                    ol({children}) {return <ol className="list-decimal">{children}</ol>}
                }}>{fetchedJson.content}</Markdown>
            </div>
            <div className="flex flex-col gap-y-3 w-[700px] py-3"> 
                <Reply articleId={articleId}/>
            </div>

        </div>
        </>
    );
}