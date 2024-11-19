// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
 
const testData = {
    login : {
        email : 'test@local.com',
        password : 'masan'
    }
} 

export const handlers = [
    http.post('/api/users/login', async ({request}) => {
        const requestData = await request.json();
        if (typeof(requestData) ==='object'  && requestData && requestData.email === testData.login.email && requestData.password ===testData.login.password) {
            return new Response('redirecting',{
                status: 302,
                headers: {
                    'Location' : '/'
                }
            })
        }
        return HttpResponse.json({error:'로그인 실패'},{
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }),
]