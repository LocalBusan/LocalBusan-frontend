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



export default function Reply({articleId}:ArticleProps) {

    const updateReplyData = async () => {
        if (clickCount > 0 && nowReplyText !== '') {
            await fetch(`/api/boards/${articleId}/comments`,{
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                credentials: 'include',
                body : JSON.stringify({
                    content : nowReplyText
                }),
               
            }) 
        }
        const replyResponse = await fetch(`/api/boards/${articleId}/comments`,{method : 'GET',
            headers: {
            'Content-Type' : 'application/json'
        },
        })
        if (replyResponse.status === 200 ) {
            setReplyData(await replyResponse.json());
        }
    }
    const [replyDataArray,setReplyData] = useState([]);
    const [nowReplyText, setReplyText] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const onClickWriteButton = async () => {
        setClickCount(clickCount+1);
    }
    const onClickeDeleteButton = async (reply_id:number) => {
        await fetch(`/api/boards/${articleId}/comments/${reply_id}`,{
            method:'DELETE',
            credentials: 'include',
        }) 
        setDeleteCount(deleteCount + 1);
    }
    const onTextareaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyText(e.currentTarget.value);
    }
    useEffect(
        ()=>{updateReplyData()},
        [clickCount,deleteCount]
    );

    return (
        <>
            <h2 className="text-2xl font-bold">댓글</h2>
            <div className="flex flex-col gap-y-4">
                {
                    replyDataArray.map((reply : ReplyData, index : number) => {
                        return (
                        <div key={index} className="flex px-3 flex-col justify-center h-[100px]  bg-gray-100 rounded">
                            <div>
                                <h3 className="text-lg font-bold">{reply.nickname}</h3>
                                {reply.content}
                            </div>

                            {
                                false
                                &&(
                                <div className="flex justify-end">
                                    <a onClick={()=>{onClickeDeleteButton(reply.reply_id)}} className="text-red-500 hover:underline hover:cursor-pointer">삭제</a>
                                </div>)
                            }
                        </div>)
                    })
                }
            </div>
            <div className="flex flex-col gap-2">
                <Textarea onChange={onTextareaChange} placeholder="여기에 댓글을 입력해주세요"></Textarea>
                <Button onClick={onClickWriteButton} className="">댓글 작성</Button>
            </div>
        </>
    )
}