import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { checkIsImage } from './utils/fileFilter';
import { AuthGuard } from '@nestjs/passport';
import { AwsS3Service } from './awsS3.service';

@Controller('file')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}
  @Post('image')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: checkIsImage,
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.awsS3Service.uploadToS3(file);
  }

  @Delete(':fileKey')
  @UseGuards(AuthGuard())
  async deleteImage(@Param('fileKey') fileKey: string) {
    return this.awsS3Service.deleteImageFromS3(fileKey);
  }
}
