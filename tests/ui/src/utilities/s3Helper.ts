import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline, Readable } from 'stream';
import { promisify } from 'util';

const bucket = `nhse-uec-cm-ui-test-bucket-${process.env.ENV}${process.env.WORKSPACE}`;

const client = new S3Client({ region: process.env.REGION });

export async function addObject(sourceFilePath: string, targetFile: string) {
  const fileContent = await readFile(sourceFilePath);
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: targetFile,
    Body: fileContent,
  });

  await client.send(command);
};

export async function getObject(sourceFile: string, targetFile?: string) {
  if (targetFile === undefined) targetFile = sourceFile;

  try {
    const pipelineAsync = promisify(pipeline);
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: sourceFile,
    });

    const response = await client.send(command);
    if (response.Body) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bodyStream = Readable.fromWeb(response.Body as any);
      const writeStream = createWriteStream(`${targetFile}`);
      await pipelineAsync(bodyStream, writeStream);
    } else {
      console.error('No data in response body');
    }
  } catch (error) {
    console.log('Error retrieving object', error);
  }
};

export async function deleteObject(targetFile: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: targetFile,
    });

    await client.send(command);
  } catch (error) {
    console.log('Error deleting object', error);
  }
};
