import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListModule } from './todo-list/todo-list.module';
import { ActivityModule } from './activity/activity.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './app.response.interceptor';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from './app.http_exception_filter.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TodoListModule,
    ActivityModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
