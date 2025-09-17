import { DynamoDBModule } from '@core/dynamodb';
import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { DiscoveryService } from './discovery.service';

@Module({
  imports: [SearchModule, DynamoDBModule],
  providers: [DiscoveryService],
  exports: [DiscoveryService],
})
export class DiscoveryModule {}
