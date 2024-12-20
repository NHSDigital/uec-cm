import { CloudFrontClient, ListDistributionsCommand } from '@aws-sdk/client-cloudfront';

export async function getCloudFrontUrl(region: string, env: string, workspace: string) {
  const client = new CloudFrontClient({ region: region });

  try {
    const command = new ListDistributionsCommand({});
    const response = await client.send(command);
    const distributions = response.DistributionList?.Items;

    if (!distributions) {
        console.log('No distributions found');
        return null;
    }

    const filteredDistribution = distributions.find(dist =>
        dist.Origins?.Items?.[0].DomainName === `nhse-uec-cm-${env}-front-end${workspace}.s3.${region}.amazonaws.com`
    );

    if (!filteredDistribution) {
        console.log('No matching distribution found');
        return null;
    }

    return filteredDistribution.DomainName;
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}
