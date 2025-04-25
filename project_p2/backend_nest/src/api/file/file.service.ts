import { Injectable, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { In, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs'

@Injectable()
export class FileService {

    constructor( @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) { }


    async saveFileMetadata(files: Array<Express.Multer.File>) {
        const fileMetadata = await this.fileRepository.save(files)
        return fileMetadata;

    }

    async getFileMetadata(filesId: String[]) {
        const fileMetadata = await this.fileRepository.find({
            where: {
                id: In(filesId)
            }
        })
        return fileMetadata
    }

    async deleteFileAndMetadata(fileId: string[]):  Promise<Boolean> {
        const filePaths: string[] = await this.fileRepository.find({
            where: {
                id: In(fileId)
            }
        }).then((files) => files.map((file) => file.path))
        await this.fileRepository.delete({
            id: In(fileId)
        })
        filePaths.forEach((filePath: string) => {
            fs.unlinkSync(filePath)
        })
        return true;
    }

}
