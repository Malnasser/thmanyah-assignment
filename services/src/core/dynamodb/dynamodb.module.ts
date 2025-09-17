import { Module } from '@nestjs/common';
import { dynamoDBClientProvider } from './dynamodb.provider';

@Module({
  providers: [dynamoDBClientProvider],
  exports: [dynamoDBClientProvider],
})
export class DynamoDBModule {}
