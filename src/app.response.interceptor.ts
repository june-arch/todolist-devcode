import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable({ scope: Scope.REQUEST })
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((data) => {
        //skip streaming response
        if (
          context.switchToHttp().getResponse().getHeaders()[
            'content-disposition'
          ]
        ) {
          return data;
        }

        const response = {
          status: 'Success',
          message: data?.message || 'Success',
          data: data,
        };

        return response;
      }),
    );
  }
}
