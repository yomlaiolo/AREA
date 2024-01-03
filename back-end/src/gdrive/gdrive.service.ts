import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { google } from 'googleapis';

@Injectable()
export class GDriveService {
  async uploadFile(file: Express.Multer.File, path: string, oauthToken: string, clientEmail: string): Promise<string> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const { originalname } = file;
    const fileName = `${new Date().getTime()}-${originalname}`;

    console.log("file name: " + fileName);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: file.mimetype,
        parents: [path],
      },
      media: {
        mimeType: file.mimetype,
        body: file.buffer,
      },
    });

    return response.data.id;
  };

  async isFileIn(file_name: string, oauthToken: string, clientEmail: string) {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({version: 'v3', auth: oAuth2Client});

    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });

    const files = res.data.files;
    if (files.length === 0) {
      console.log('No files found.');
      return false;
    }
  
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
      if (file.name == file_name) {
        return true;
      }
    });
    return false;
  }
}
