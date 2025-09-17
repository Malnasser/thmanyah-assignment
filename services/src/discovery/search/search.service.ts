import { Inject, Injectable } from '@nestjs/common';
import { SearchProgramDto } from './dto/search-program.dto';
import { ApiTags } from '@nestjs/swagger';
import { DYNAMO_DB_CLIENT } from '@core/dynamodb';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

@ApiTags('Search')
@Injectable()
export class SearchService {
  constructor(
    @Inject(DYNAMO_DB_CLIENT)
    private readonly dynamoDBClient: DynamoDBDocumentClient,
    private readonly configService: ConfigService,
  ) {}

  async search(dto: SearchProgramDto) {
    const { keyword, category, language, page = 1, limit = 10 } = dto;

    if (category) {
      const result = await this.dynamoDBClient.send(
        new QueryCommand({
          TableName: this.configService.get('app.dynamodb.publish_table'),
          IndexName: 'category',
          KeyConditionExpression: '#catId = :cat',
          ExpressionAttributeNames: { '#catId': 'categoryId' },
          ExpressionAttributeValues: { ':cat': category },
          Limit: limit,
        }),
      );

      return result.Items || [];
    }

    if (language) {
      const result = await this.dynamoDBClient.send(
        new QueryCommand({
          TableName: this.configService.get('app.dynamodb.publish_table'),
          IndexName: 'language',
          KeyConditionExpression: '#lang = :lang',
          ExpressionAttributeNames: { '#lang': 'language' },
          ExpressionAttributeValues: { ':lang': language },
          Limit: limit,
        }),
      );

      return result.Items || [];
    }

    const filterExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    if (keyword) {
      filterExpressions.push(
        'contains(#title, :kw) OR contains(#description, :kw)',
      );
      expressionAttributeNames['#title'] = 'title';
      expressionAttributeNames['#description'] = 'description';
      expressionAttributeValues[':kw'] = keyword;
    }

    const scanResult = await this.dynamoDBClient.send(
      new ScanCommand({
        TableName: this.configService.get('app.dynamodb.publish_table'),
        FilterExpression: filterExpressions.length
          ? filterExpressions.join(' AND ')
          : undefined,
        ExpressionAttributeNames: Object.keys(expressionAttributeNames).length
          ? expressionAttributeNames
          : undefined,
        ExpressionAttributeValues: Object.keys(expressionAttributeValues).length
          ? expressionAttributeValues
          : undefined,
        Limit: limit * page,
      }),
    );

    const start = (page - 1) * limit;
    return (scanResult.Items || []).slice(start, start + limit);
  }
}
