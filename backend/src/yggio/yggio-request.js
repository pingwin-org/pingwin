'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');
const _ = require('lodash');

const config = require('../../config.json');

let yggioUrl = null;
let accessToken = null;

const refreshToken = async () => {
  try {
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
  } catch (e) {
    console.error('Error when refreshing token.');
    throw e;
  }
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
  const res = await axios(axiosData);
  return res.data;
};

const yggioRequest = async (...args) => {
  let data;
  try {
    try {
      data = await doRequest(...args);
    } catch (e) {
      const jsonError = e.toJSON();
      if (_.includes([401, 403, 405, 500], jsonError.status)) {
        await refreshToken();
      } else {
        console.error('Error in Yggio-request, and it\'s not token.');
        throw e;
      }
    }
    data = await doRequest(...args);
  } catch (err) {
    console.error(args);
    console.error(err.toJSON() + ' \n');
  }
  return data;
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
