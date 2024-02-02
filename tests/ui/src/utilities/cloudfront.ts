
export function getCloudFrontUrl(workspace: string) {return require('child_process').execSync(
  `aws cloudfront list-distributions --query "DistributionList.Items[].{DomainName: DomainName, OriginDomainName: Origins.Items[0].DomainName}[?contains(OriginDomainName, 'front-end`+workspace+`')] | [0]"`).toString();
}
