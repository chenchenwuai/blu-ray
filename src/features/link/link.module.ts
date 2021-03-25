import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkEntity } from './link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkEntity])
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
