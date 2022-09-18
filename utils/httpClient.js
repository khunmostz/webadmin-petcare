import axios from "axios";

const httpClient = axios.create({
  baseURL:
    "http://apicare-env.eba-em9ynm3z.ap-southeast-1.elasticbeanstalk.com/api/v1/petcare",
});
export default httpClient;
