// Copyright (c) 2018-2022 The CYBAVO developers
// All Rights Reserved.
// NOTICE: All information contained herein is, and remains
// the property of CYBAVO and its suppliers,
// if any. The intellectual and technical concepts contained
// herein are proprietary to CYBAVO
// Dissemination of this information or reproduction of this materia
// is strictly forbidden unless prior written permission is obtained
// from CYBAVO.

const express = require('express');
const api = require('../helper/apicaller');

const router = express.Router();

router.get('/healthcheck', async function(req, res) {
  const apires = await api.makeRequest(0, "GET",
    `/v1/sofa/healthcheck`, null, null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

module.exports = router;
