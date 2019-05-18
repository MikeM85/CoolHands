'use strict';

const _url = require('url');

const toRequestOptions = (requestModel) =>{

  const optionsFromUrl = _url.parse(requestModel.url);
  const options = Object.assign({}, optionsFromUrl, requestModel);
  
  return options;
};

module.exports = toRequestOptions;