import axios from "axios";

export const api = axios.create({
  baseURL:
    "mysql://qys90fy1623lx635dwr7:pscale_pw_R8vjh6IOcpWipXxU7ikZMvMYVblQe4136u1Kz3LF6GI@us-east.connect.psdb.cloud/nlw-setup-ignite?sslaccept=strict",
});
