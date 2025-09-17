import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DYNAMO_DB_CLIENT = 'DYNAMO_DB_CLIENT';

export const dynamoDBClientProvider: Provider = {
  provide: DYNAMO_DB_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const env = configService.get<string>('app.env');
    const isLocal = env !== 'production';

    const client = new DynamoDBClient({
      region: configService.get<string>('aws.region') || 'us-east-1',
      endpoint: isLocal
        ? configService.get<string>('aws.endpoint') || 'http://localhost:8000'
        : undefined,
      credentials: {
        accessKeyId: isLocal
          ? configService.get<string>('aws.accessKeyId') || 'dummy'
          : configService.get<string>('aws.accessKeyId')!,
        secretAccessKey: isLocal
          ? configService.get<string>('aws.secretAccessKey') || 'dummy'
          : configService.get<string>('aws.secretAccessKey')!,
      },
    });

    // Wrap the low-level client in DynamoDBDocumentClient for easier JS object usage
    return DynamoDBDocumentClient.from(client);
  },
};
