import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { PrismaModule } from 'src/helpers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
