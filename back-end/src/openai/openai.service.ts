import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

async function readPdfContent(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

async function readDocxContent(docxPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(docxPath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });
  return result.value;
};

@Injectable()
export class OpenAIService {
  ResumeEmail = async (prompt: string, token: string, language: string = 'english') => {
    let response = '';
    const openai = new OpenAI({
      apiKey: token,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Users will give you emails, your objective is to sumarize them in a few sentences. Use ' + language + ' as language to write.' }, { role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo-1106',
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
      model: 'gpt-3.5-turbo-1106',
      stream: true,
    });
    for await (const message of completion) {
      response += (message.choices[0]?.delta?.content || '');
    }
    return response;
  };

  ResumeFile = async (file_path: string, token: string, language: string = 'english') => {
    let response = '';
    const openai = new OpenAI({
      apiKey: token,
    });

    let fileContent = '';
    // Déterminez le type de fichier pour choisir la bonne méthode de lecture
    if (file_path.endsWith('.pdf')) {
      fileContent = await readPdfContent(file_path);
    } else if (file_path.endsWith('.docx')) {
      fileContent = await readDocxContent(file_path);
    } else {
      throw new Error('Unsupported file format');
    }

    console.log(file_path);
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Users will give you content as input, your objective is to sumarize them in a few sentences, begin by saying what type of file it is, and informations about the authors if you got it. Use ' + language + ' as language to write.' }, { role: 'user', content: fileContent }],

      model: 'gpt-3.5-turbo-1106',
      stream: true,
    });
    for await (const message of completion) {
      response += (message.choices[0]?.delta?.content || '');
    }
    fs.unlinkSync(file_path);

    return response;
  }
}
