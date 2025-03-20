import { Injectable, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FileService {

    constructor( @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) { }


    async saveFileMetadata(files: Array<Express.Multer.File>) {
        console.log(files)
        const fileMetadata = await this.fileRepository.save(files)
        return fileMetadata;

    }

}
