import { FileEntity } from "src/api/file/entities/file.entity";

interface CreateServerEntity {

    id: string;
    server_name: string;
    image: FileEntity;
    creator: string;
}