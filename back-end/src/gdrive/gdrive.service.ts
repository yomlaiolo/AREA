import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GDriveService {
  async createFolderIfNotExist(
    folderName: string,
    drive: any,
  ): Promise<string> {
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
      fields: 'files(id, name)',
    });

    if (response.data.files.length === 0) {
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };
      const res = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });
      return res.data.id;
    }

    return response.data.files[0].id;
  }

  async uploadFile(
    file: string,
    path: string,
    oauthToken: string,
  ): Promise<string> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const fileName = `${new Date().getTime()}-${file.split('/')[1]}`;

    const fileStream = fs.createReadStream(file);

    // console.log('file name: ' + fileName);

    let folderId = '';
    if (path !== '') {
      folderId = await this.createFolderIfNotExist(path, drive);
    }

    const requestBody: any = {
      name: fileName,
      mimeType: 'text/plain',
    };

    if (folderId !== '') {
      requestBody.parents = [folderId];
    }

    const response = await drive.files.create({
      requestBody: requestBody,
      media: {
        mimeType: 'text/plain',
        body: fileStream,
      },
    });

    return response.data.id;
  }

  async isFileIn(file_name: string, oauthToken: string) {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });

    const files = res.data.files;
    if (files.length === 0) {
      // console.log('No files found.');
      return false;
    }

    files.map((file) => {
      // console.log(`${file.name} (${file.id})`);
      if (file.name == file_name) {
        return true;
      }
    });
    return false;
  }

  async deleteFile(file_name: string, oauthToken: string): Promise<boolean> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });

    const files = res.data.files;
    if (files.length === 0) {
      // console.log('No files found.');
      return false;
    }

    files.map((file) => {
      // console.log(`${file.name} (${file.id})`);
      if (file.name == file_name) {
        drive.files.delete({ fileId: file.id });
        return true;
      }
    });
    return false;
  }

  async createGoogleDoc(
    file_name: string,
    file_content: string,
    oauthToken: string,
  ): Promise<string> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const requestBody: any = {
      name: file_name,
      mimeType: 'application/vnd.google-apps.document',
    };

    const response = await drive.files.create({
      requestBody: requestBody,
    });

    const fileId = response.data.id;

    const fileMetadata = {
      name: file_name,
      mimeType: 'application/vnd.google-apps.document',
    };

    const media = {
      mimeType: 'text/plain',
      body: file_content,
    };

    await drive.files.update({
      fileId: fileId,
      media: media,
      fields: 'id',
    });

    return response.data.id;
  }

  async createGoogleSheet(
    file_name: string,
    csv_content: string,
    oauthToken: string,
  ): Promise<string> {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: oauthToken });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const requestBody: any = {
      name: file_name,
      mimeType: 'application/vnd.google-apps.spreadsheet',
    };

    const response = await drive.files.create({
      requestBody: requestBody,
    });

    const fileId = response.data.id;

    const fileMetadata = {
      name: file_name,
      mimeType: 'application/vnd.google-apps.spreadsheet',
    };

    const media = {
      mimeType: 'text/csv',
      body: csv_content,
    };

    await drive.files.update({
      fileId: fileId,
      media: media,
      fields: 'id',
    });

    return response.data.id;
  }
}
