import { Injectable } from '@nestjs/common';
import fs from 'fs';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  ResumeEmail = async (prompt: string, token: string, language: string = 'english') => {
    let response = '';
    const openai = new OpenAI({
      apiKey: token,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Users will give you emails, your objective is to sumarize them in a few sentences. Use ' + language + ' as language to write.' }, { role: 'user', content: prompt }],
      model: 'gpt-4-0314',
      stream: true,
    });
    for await (const message of completion) {
      response += (message.choices[0]?.delta?.content || '');
    }
    return response;
  };

  SuggestEmailResponse = async (prompt: string, token: string, language: string = 'english') => {
    let response = '';
    const openai = new OpenAI({
      apiKey: token,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Users will give you emails, your objective is to write a response on the same tone as the sender, but you need to stay professional, plus you can not suppose anything, use short responses if the context is short. If the email seems to be commercial or automatized, do not suggest a response, and say that there is no need to respond ( However if it is in another language, you still need to suggest a response. ). Use ' + language + ' as language to write.' }, { role: 'user', content: prompt }],
      model: 'gpt-4-0314',
      stream: true,
    });
    for await (const message of completion) {
      response += (message.choices[0]?.delta?.content || '');
    }
    return response;
  }
}
