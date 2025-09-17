import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBModule } from '@core/dynamodb';

@Module({
  imports: [ConfigModule, DynamoDBModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
