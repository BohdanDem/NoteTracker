import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm.config';
import { BoardModule } from './modules/board/board.module';
import { CheckIdMiddleware } from './common/middleware/checkId.middleware';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: '/board/:id',
        method: RequestMethod.ALL,
      },
      {
        path: '/card/:id',
        method: RequestMethod.ALL,
      },
    );
  }
}
