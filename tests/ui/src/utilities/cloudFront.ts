export function getCloudFrontUrl(region: string, env: string, workspace: string) {return require('child_process').execSync(
  `aws cloudfront list-distributions --query "DistributionList.Items[].{DomainName: DomainName, OriginDomainName: Origins.Items[0].DomainName}[?OriginDomainName=='nhse-uec-cm-` + env + `-front-end` + workspace + `.s3.` + region + `.amazonaws.com'] | [0]"`, { shell: false }).toString();
}
