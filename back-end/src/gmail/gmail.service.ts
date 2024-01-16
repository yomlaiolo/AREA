import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { htmlToText } from 'html-to-text';

@Injectable()
export class GMailService {
  async receiveMail(oauthToken: string, clientEmail: string): Promise<any[]> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const res = await gmail.users.messages.list({
      userId: clientEmail,
      q: 'is:unread',
    });

    if (res.data.resultSizeEstimate == 0) {
      return [];
    }

    const emails = [];
    for (const message of res.data.messages) {
      const mailId = message.id;
      const response = await gmail.users.messages.get({
        userId: clientEmail,
        id: mailId,
      });

      try {
        await gmail.users.messages.modify({
          userId: clientEmail,
          id: mailId,
          requestBody: {
            removeLabelIds: ['UNREAD'],
          },
        });
      } catch (e) {
        console.error(e);
      }

      const emailData = response.data.payload.headers.reduce((acc, current) => {
        if (['From', 'To', 'Subject', 'Date'].includes(current.name)) {
          acc[current.name] = current.value;
        }
        return acc;
      }, {});

      emailData['id'] = response.data.id;
      emailData['snippet'] = response.data.snippet;

      const payload = response.data.payload;
      let body = '';

      if (payload.parts) {
        payload.parts.forEach((part) => {
          if (part.mimeType === 'text/html') {
            body += emailData['body'] = Buffer.from(
              part.body.data,
              'base64',
            ).toString('utf-8');
          }
        });
      } else {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
      }
      emailData['body'] = htmlToText(body);
      emails.push(emailData);
    }

    return emails;
  }

  private createEmail(
    to: string,
    cc: string,
    title: string,
    body: string,
  ): string {
    const emailLines = [];

    emailLines.push('From: "Me" <me>');
    emailLines.push(`To: ${to}`);
    emailLines.push(`Cc: ${cc}`);
    emailLines.push(`Subject: ${title}`);
    emailLines.push('');
    emailLines.push(body);

    const email = emailLines.join('\r\n').trim();

    const base64EncodedEmail = Buffer.from(email).toString('base64');
    return base64EncodedEmail;
  }

  async sendEmail(
    to: string,
    cc: string,
    title: string,
    body: string,
    oauthToken: string,
  ) {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    //Send the email
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: this.createEmail(to, cc, title, body),
      },
    });

    return;
  }
}
