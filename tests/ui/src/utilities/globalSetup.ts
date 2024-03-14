import { type FullConfig } from '@playwright/test';
import { getCloudFrontUrl } from "./cloudFront"
import { getEnv } from "../config/env";

async function globalSetup(config: FullConfig) {
  getEnv();

  if (process.env.WORKSPACE != "default")
    {process.env.WORKSPACE = "-" + process.env.WORKSPACE}
  else
    {process.env.WORKSPACE = ""};

    const workspace = process.env.WORKSPACE as string;
    const env = process.env.ENV as string;
    const region = process.env.REGION as string;
    const distribution = getCloudFrontUrl(region, env, workspace);
    const baseUrl = JSON.parse(distribution).DomainName;
    process.env.baseUrl = baseUrl;
  }


export default globalSetup;
