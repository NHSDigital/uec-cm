
export function getS3BucketObject(sourceFileName: string, targetFileName?: string) {
  const bucketName: string = 'test-read-s3-bucket-solomon';
  if (targetFileName === undefined) targetFileName = sourceFileName;
  return require('child_process').execSync(
    `aws s3api get-object --bucket ${bucketName} --key ${sourceFileName} downloads/${targetFileName}`
)}
