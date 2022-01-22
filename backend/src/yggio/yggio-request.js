'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');
const _ = require('lodash');

const config = require('../../config.json');

let yggioUrl = null;
let accessToken = null;

const refreshToken = async () => {
  const res = await axios({
    method: 'post',
    url: yggioUrl + '/auth/local',
    json: true,
    data: {
      username: config.YGGIO_USERNAME, 
      password: config.YGGIO_PASSWORD
    }
  });
  accessToken = res.data.token;
};

const doRequest = async ({
  method,
  data,
  url,
  params,
  json = true,
  headers,
  formData
}) => {
  if (!yggioUrl) {
    throw new Error('yggioUrl is not set');
  }
  if (!url) {
    throw new Error('yggio api url is missing');
  }

  const axiosData = _.pickBy({
    method,
    url: yggioUrl + url,
    params,
    data,
    json,
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`
    },
    formData
  }, Boolean);
  console.log(axiosData);
  const res = await axios(axiosData);
  return res.data;
};

const yggioRequest = async (...args) => {
  try {
    const data = await doRequest(...args);
    return data;
  } catch (e) {
    const jsonError = e.toJSON();
    if (_.includes([401, 403, 405, 500], jsonError.status)) {
      await refreshToken();
      const data = await doRequest(...args);
      return data;
    } else {
      console.log(jsonError);
    }
  }
};

module.exports = {
  setYggioUrl: url => {
    yggioUrl = url;
  },
  get: async requestObj => yggioRequest({
    ...requestObj,
    method: 'get'
  }),
  post: async requestObj => yggioRequest({
    ...requestObj,
    method: 'post'
  }),
  put: async requestObj => yggioRequest({
    ...requestObj,
    method: 'put'
  }),
  delete: async requestObj => yggioRequest({
    ...requestObj,
    method: 'delete'
  }),
  axios
};
