import { Controller, Delete, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ExemptRoute } from 'src/exempt/exempt.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 5, {
    dest: './uploads',
    fileFilter: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const originalName = file.originalname.replace(/\s+/g, '_');
      callback(null, true);
    }
  }))
  async uploadFile(body: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
    console.log("Files", files)
    return await this.fileService.saveFileMetadata(files)
  }
  @Get('/image/:id')
  async getImage(@Param('id') imageId: string, @Res() res: Response) {
    const fileMetadataList = await this.fileService.getFileMetadata([imageId]);

    if (fileMetadataList.length === 0) {
      return res.status(404).send('Image not found');
    }

    const fileMetadata = fileMetadataList[0];
    const filePath = `./uploads/${fileMetadata.filename}`;

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename="image.png"`);
    res.sendFile(filePath, { root: '.' }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  }

  @Delete('/image/:id')
  async deleteImage(@Param('id') imageId: string) {
    await this.fileService.deleteFileAndMetadata([imageId])
    return imageId
  }


}
