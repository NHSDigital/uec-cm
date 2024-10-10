import childProcess from "child_process";

const bucket = `nhse-uec-cm-ui-test-bucket-${process.env.ENV}${process.env.WORKSPACE}`;

export function addObject(sourceFilePath: string, targetFile: string) {
  return childProcess.execSync(
    `aws s3api put-object --bucket ${bucket} --key ${targetFile} --body ${sourceFilePath}`
)};

export function getObject(sourceFile: string, targetFile?: string) {
  if (targetFile === undefined) targetFile = sourceFile;
  try {
    return childProcess.execSync(
      `aws s3api get-object --bucket ${bucket} --key ${sourceFile} downloads/${targetFile}`
    )
  } catch (error) {
    console.log(error);
  }
};

export function deleteObject(targetFile: string) {
  try {
    return childProcess.execSync(
      `aws s3api delete-object --bucket ${bucket} --key ${targetFile}`
    )
  } catch (error) {
    console.log(error);
  }
};
