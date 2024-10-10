import childProcess from "child_process";

export function getCloudFrontUrl(region: string, env: string, workspace: string) {return childProcess.execSync(
  `aws cloudfront list-distributions --query "DistributionList.Items[].{DomainName: DomainName, OriginDomainName: Origins.Items[0].DomainName}[?OriginDomainName=='nhse-uec-cm-`+env+`-front-end`+workspace+`.s3.`+region+`.amazonaws.com'] | [0]"`).toString();
}
