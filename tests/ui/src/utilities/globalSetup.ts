import { getCloudFrontUrl } from "./cloudFront";
import { getEnv } from "../config/env";

async function globalSetup() {
  getEnv();

  if (process.env.WORKSPACE != "default")
    {process.env.WORKSPACE = "-" + process.env.WORKSPACE}
  else
    {process.env.WORKSPACE = ""};

    const workspace = process.env.WORKSPACE as string;
    const env = process.env.ENV as string;
    const region = process.env.REGION as string;
    await getCloudFrontUrl(region, env, workspace).then((distribution) =>{
      if (distribution) {
        const baseUrl = distribution.DomainName;
        process.env.baseUrl = baseUrl;
      } else {
        console.log('No domain name found');
      }
    }).catch((error) => {
      console.error('Error getting cloud front url', error);
    });
  }

export default globalSetup;
