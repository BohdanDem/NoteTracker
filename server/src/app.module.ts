import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm.config';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
