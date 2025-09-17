import { Program } from '@cms/programs';
import { DYNAMO_DB_CLIENT } from '@core/dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import flattenObject from '@core/dynamodb/utils/flattenObject';

@Injectable()
export class DiscoveryService {
  constructor(
    @Inject(DYNAMO_DB_CLIENT)
    private readonly dynamoDBClient: DynamoDBDocumentClient,
    private readonly configService: ConfigService,
  ) {}

  public async putProgram(entity: Program): Promise<Program | null> {
    try {
      const flattened = flattenObject(entity);

      await this.dynamoDBClient.send(
        new PutCommand({
          TableName: this.configService.get('app.dynamodb.publish_table'),
          Item: flattened,
        }),
      );

      return entity;
    } catch (e) {
      console.error('DynamoDB put error:', e);
      return null;
    }
  }
}
