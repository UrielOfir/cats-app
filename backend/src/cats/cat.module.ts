import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatSession } from './catSession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatSession])],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
