import { S3, config } from 'aws-sdk';
import { ReadStream } from 'fs';

const {
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_S3_ENDPOINT: endpoint,
  AWS_REGION: region,
  AWS_BUCKET_NAME: Bucket,
} = process.env;

config.update({ accessKeyId, secretAccessKey });
const s3 = new S3({ region, endpoint });

interface PutObjectResult {
  URL: string;
  ETag?: string;
}

export async function putObject(
  Key: string,
  Body: ReadStream | Buffer,
): Promise<PutObjectResult> {
  if (!Bucket) throw Error('Bucket Not Found');
  const { ETag } = await s3
    .putObject({
      Bucket,
      Key,
      Body,
      ACL: 'public-read',
    })
    .promise();
  const URL = `${endpoint}/${Bucket}/${Key}`;

  return { URL, ETag };
}
