import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    let url = 'mysql://';

    url += process.env.MYSQL_USER;
    url += ':';
    url += process.env.MYSQL_PASSWORD;
    url += '@';
    url += process.env.MYSQL_HOST;
    url += ':';
    url += process.env.MYSQL_PORT;
    url += '/';
    url += process.env.MYSQL_DBNAME;

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.model == 'activity_group' || params.model == 'todolist') {
        if (params.action == 'create') {
          // Delete queries
          // Change action to an update
          params.args['data'] = { ...params.args['data'], is_deleted: '0' };
        }
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update';
          params.args['data'] = { is_deleted: '1', deleted_at: new Date() };
        }
        if (params.action == 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany';
          if (params.args.data != undefined) {
            params.args.data['is_deleted'] = '1';
            params.args.data['deleted_at'] = new Date();
          } else {
            params.args['data'] = { is_deleted: '1', deleted_at: new Date() };
          }
        }
      }
      const result = await next(params);
      // See results here
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
