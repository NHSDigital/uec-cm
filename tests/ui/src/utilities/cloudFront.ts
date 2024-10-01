import { CloudFrontClient, ListDistributionsCommand } from '@aws-sdk/client-cloudfront';

export async function getCloudFrontUrl(region: string, env: string, workspace: string) {
  const client = new CloudFrontClient({ region: region });

  try {
    const command = new ListDistributionsCommand({});
    const response = await client.send(command);

    if (response.DistributionList && response.DistributionList.Items) {
      const distributions = response.DistributionList.Items;
      const filteredDistribution = distributions.find(dist =>
        dist.Origins?.Items?.[0].DomainName === `nhse-uec-cm-${env}-front-end${workspace}.s3.${region}.amazonaws.com`
      );

      if (filteredDistribution) {
        return {
          DomainName: filteredDistribution.DomainName ?? '',
          OriginDomainName: filteredDistribution.Origins?.Items?.[0].DomainName ?? '',
        };
      } else {
        console.log('No matching distribution found');
        return null;
      }
    } else {
      console.log('No distributions found');
      return null;
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
  // return require('child_process').execSync(
  //   `aws cloudfront list-distributions --query "DistributionList.Items[].{DomainName: DomainName, OriginDomainName: Origins.Items[0].DomainName}[?OriginDomainName=='nhse-uec-cm-`+env+`-front-end`+workspace+`.s3.`+region+`.amazonaws.com'] | [0]"`
  // ).toString();
}
