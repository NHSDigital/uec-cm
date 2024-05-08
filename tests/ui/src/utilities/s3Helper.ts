
const workspace = (process.env.WORKSPACE === 'default') ? '' : process.env.WORKSPACE;
const bucket = `nhse-uec-cm-test-bucket${workspace}`;

export function addObject(sourceFilePath: string, targetFile: string) {
  return require('child_process').execSync(
    `aws s3api put-object --bucket ${bucket} --key ${targetFile} --body ${sourceFilePath}`
)};

export function getObject(sourceFile: string, targetFile?: string) {
  if (targetFile === undefined) targetFile = sourceFile;
  try {
    return require('child_process').execSync(
      `aws s3api get-object --bucket ${bucket} --key ${sourceFile} downloads/${targetFile}`
    )
  } catch (error) {
    console.log(error);
  }
};

export function deleteObject(targetFile: string) {
  try {
    return require('child_process').execSync(
      `aws s3api delete-object --bucket ${bucket} --key ${targetFile}`
    )
  } catch (error) {
    console.log(error);
  }
};
