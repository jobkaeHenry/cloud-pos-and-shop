import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const checkIsImage: MulterOptions['fileFilter'] = (_, file, cb) => {
  const imageMimeRegex = /^image\/(jpeg|jpg|png|gif)$/;

  if (!imageMimeRegex.test(file.mimetype)) {
    return cb(
      new BadRequestException('올바르지 않은 파일 형식 입니다.'),
      false
    );
  }
  return cb(null, true);
};
