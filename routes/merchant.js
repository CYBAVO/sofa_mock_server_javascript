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
const apicode = require('../models/apicode');
const crypto = require('crypto');

const router = express.Router();

function getQueryParams(query) {
  if (Object.keys(query).length === 0) {
    return null;
  }

  return Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  }); 
}

router.post('/:merchant_id/apitoken', function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  apicode.setAPICode(req.params.merchant_id, req.body.api_code, req.body.api_secret);
  console.log('API Code:', req.body.api_code, 'API Secret:', req.body.api_secret);
  res.status(200).json({ result: 1 });
});

router.post('/:merchant_id/order', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }

  if (req.body.redirect_url) {
    req.body.redirect_url = encodeURIComponent(req.body.redirect_url);
  }

  const apires = await api.makeRequest(req.params.merchant_id, "POST",
    `/v1/merchant/${req.params.merchant_id}/order`, null, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:merchant_id/order', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "GET",
    `/v1/merchant/${req.params.merchant_id}/order`, getQueryParams(req.query), null);
  if (apires.statusCode) {
    if (apires.result.redirect_url) {
      apires.result.redirect_url = decodeURIComponent(apires.result.redirect_url);
    }
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:merchant_id/order/duration', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "POST",
    `/v1/merchant/${req.params.merchant_id}/order/duration`,
    null, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.delete('/:merchant_id/order', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "DELETE",
    `/v1/merchant/${req.params.merchant_id}/order`,
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});


router.get('/:merchant_id/apisecret', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "GET",
    `/v1/merchant/${req.params.merchant_id}/apisecret`, null, null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:merchant_id/apisecret/activate', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "POST",
    `/v1/merchant/${req.params.merchant_id}/apisecret/activate`, null, null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:merchant_id/apisecret/refreshsecret', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "POST",
    `/v1/merchant/${req.params.merchant_id}/apisecret/refreshsecret`,
    null, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:merchant_id/notifications/manual', async function(req, res) {
  if (!req.params.merchant_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.makeRequest(req.params.merchant_id, "POST",
    `/v1/merchant/${req.params.merchant_id}/notifications/manual`,
    null, null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/callback', async function(req, res) {

  const apiCodeObj = await apicode.getAPICode(req.body.merchant_id).catch(() => {
  });
  if (!apiCodeObj) {
    res.status(400).send('unknown wallet ID');
    return;
  }

  const checksum = req.get('X-CHECKSUM');
  const payload = JSON.stringify(req.body) + apiCodeObj.secret;
  const buff = Buffer.from(crypto.createHash('sha256').update(payload).digest());
  const checksumVerf = buff.toString('base64').replace(/\+/g, "-").replace(/\//g, "_");
  if (checksum !== checksumVerf) {
    res.status(400).send('Bad checksum');
    return;
  }

  const MerchantOrderState = {
    Success: 0,
    Expired: 1,
    Insufficient: 2,
    Excess: 3,
    Cancel: 4,
  };

	if (req.body.state == MerchantOrderState.Success) {
	} else if (req.body.state == MerchantOrderState.Expired) {
	} else if (req.body.state == MerchantOrderState.Insufficient) {
	} else if (req.body.state == MerchantOrderState.Excess) {
	} else if (req.body.state == MerchantOrderState.Cancel) {
	}

  console.log('callback ->', req.body);

  // reply 200 OK to confirm the callback has been processed
  res.status(200).send('OK');
});

module.exports = router;
