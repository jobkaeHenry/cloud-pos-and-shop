import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    // PostgreSQL에서 고유 제약조건 위반인 경우
    if (exception.driverError.code === '23505') {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Duplicate Unique key. Please choose a different one.',
      });
    } else {
      // 다른 예외 발생 시 500 Internal Server Error로 응답
      console.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }
}
