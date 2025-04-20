import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}


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
      console.log("Files",files)
      return await this.fileService.saveFileMetadata(files)
  }
  
}
