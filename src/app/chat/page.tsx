'use client';
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import { useState, useEffect } from 'react';

interface ArticleProps {
    articleId : string
}

interface ReplyData {
    reply_id : number,
    nickname : string,
    content : string,
    created_at : string,
}



export default function Page() {

    const updateReplyData = async () => {
        if (clickCount > 0) {
            setReplyData([...replyDataArray,{nickname:'나',content : nowReplyText}])
        }
        const replyResponse = await fetch(`/chatbot`,{method : 'POST',
            headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            instruction : nowReplyText
        }),
        })
        if (replyResponse.ok ) {
            const responseJson = await replyResponse.json(); 
            setReplyData([{nickname:'로컬부산 챗봇',content:responseJson.response},...replyDataArray,]);
        }
    }
    const [replyDataArray,setReplyData] = useState([]);
    const [nowReplyText, setReplyText] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const onClickWriteButton = async () => {
        setClickCount(clickCount+1);
    }
    const onTextareaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyText(e.currentTarget.value);
    }
    useEffect(
        ()=>{updateReplyData()},
        [clickCount]
    );

    return (
        <div className=' flex flex-col justify-center items-center my-11'>
            <div className='w-[800px] flex flex-col gap-4' >
                <h2 className="text-2xl font-bold">챗봇</h2>
                <div className="flex flex-col gap-y-4">
                    {
                        replyDataArray.map((reply : ReplyData, index : number) => {
                            if (reply.nickname === '로컬부산 챗봇') {
                            return (    
                            <div key={index} className="flex px-3 flex-col justify-center h-[100px]  bg-white rounded stroke-black">
                                <div>
                                    <h3 className="text-lg font-bold">{reply.nickname}</h3>
                                    {reply.content}
                                </div>
                                <div className="flex justify-end">
                                </div>
                            </div>)
                            }
                            return (    
                            <div key={index} className="flex px-3 flex-col justify-center h-[100px]  bg-gray-100 rounded">
                                <div>
                                    <h3 className="text-lg font-bold">{reply.nickname}</h3>
                                    {reply.content}
                                </div>
                                <div className="flex justify-end">
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <Textarea onChange={onTextareaChange} placeholder="여기에 댓글을 입력해주세요"></Textarea>
                    <Button onClick={onClickWriteButton} className="">질문 하기</Button>
                </div>
            </div>
        </div>
    )
}