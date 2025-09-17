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
      endpoint: isLocal ? configService.get<string>('aws.endpoint') : undefined,
      ...(isLocal
        ? {
            credentials: {
              accessKeyId: configService.get<string>('aws.accessKeyId'),
              secretAccessKey: configService.get<string>('aws.secretAccessKey'),
            },
          }
        : {}),
    });
    return DynamoDBDocumentClient.from(client);
  },
};
