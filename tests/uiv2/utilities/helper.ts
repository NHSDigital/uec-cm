import { getCloudFrontUrl } from "../utilities/cloudFront"

const getBaseURL = () => {
    const workspace = process.env.WORKSPACE as string;
    const env = process.env.ENV as string;
    const region = process.env.REGION as string;
    const distribution = getCloudFrontUrl(region, env, workspace);
    return JSON.parse(distribution);
}

export {
  getBaseURL
}
