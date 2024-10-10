const bucket = `nhse-uec-cm-ui-test-bucket-${process.env.ENV}${process.env.WORKSPACE}`;

export function addObject(sourceFilePath: string, targetFile: string) {
  const cp = require('child_process');
  return cp.execSync(
    `aws s3api put-object --bucket ${bucket} --key ${targetFile} --body ${sourceFilePath}`, { shell: false }
)};

export function getObject(sourceFile: string, targetFile?: string) {
  if (targetFile === undefined) targetFile = sourceFile;
  try {
    const cp = require('child_process');
    return cp.execSync(
      `aws s3api get-object --bucket ${bucket} --key ${sourceFile} downloads/${targetFile}`, { shell: false }
    )
  } catch (error) {
    console.log(error);
  }
};

export function deleteObject(targetFile: string) {
  try {
    const cp = require('child_process');
    return cp.execSync(
      `aws s3api delete-object --bucket ${bucket} --key ${targetFile}`, { shell: false }
    )
  } catch (error) {
    console.log(error);
  }
};
