import { S3, config, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
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

export function putObject(
  Key: string,
  Body: ReadStream | Buffer,
): Promise<PromiseResult<S3.PutObjectOutput, AWSError>> {
  if (!Bucket) throw Error('Bucket Not Found');
  return s3
    .putObject({
      Bucket,
      Key,
      Body,
      ACL: 'public-read',
    })
    .promise();
}
