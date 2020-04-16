const express = require('express');
const api = require('../helper/request')
const apicode = require('../models/apicode');
const crypto = require('crypto');

const router = express.Router();

function getQueryParam(req, paramName, defaultValue) {
  const value = req.param(paramName);
  if (value) {
    return value;
  }
  return defaultValue;
}

router.post('/:wallet_id/apitoken', function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  apicode.setAPICode(req.params.wallet_id, req.body.api_code, req.body.api_secret);
  res.status(200).json({ result: 1 });
});

router.post('/:wallet_id/addresses', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.createDepositWalletAddresses(req.params.wallet_id, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/addresses', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const startIndex = getQueryParam(req, 'start_index', 0);
  const requestNumber = getQueryParam(req, 'request_number', 1000);
  const apires = await api.getDepositWalletAddresses(req.params.wallet_id, startIndex, requestNumber);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/pooladdress', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getDepositWalletPoolAddress(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:wallet_id/callback/resend', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.resendCallback(req.params.wallet_id, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:wallet_id/withdraw', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.withdrawTransactions(req.params.wallet_id, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/sender/transactions/:order_id', async function(req, res) {
  if (!req.params.wallet_id || !req.params.order_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getWithdrawTransactionState(req.params.wallet_id, req.params.order_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/sender/balance', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getWithdrawalWalletBalance(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/apisecret', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getTxAPITokenStatus(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/notifications', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const fromTime = getQueryParam(req, 'from_time', -1);
  const toTime = getQueryParam(req, 'to_time', -1);
  const notificationType = getQueryParam(req, 'type', -1);
  if (fromTime === -1 || toTime === -1 || notificationType === -1) {
    res.status(400).json({ error: 'invalid parameters' });
    return
  }

  const apires = await api.getNotifications(req.params.wallet_id, fromTime, toTime, notificationType);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:wallet_id/notifications/get_by_id', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getNotificationByID(req.params.wallet_id, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/transactions', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const fromTime = getQueryParam(req, 'from_time', -1);
  const toTime = getQueryParam(req, 'to_time', -1);
  const startIndex = getQueryParam(req, 'start_index', 0);
  const requestNumber = getQueryParam(req, 'request_number', 0);
  const state = getQueryParam(req, 'state', -1);
  if (fromTime === -1 || toTime === -1) {
    res.status(400).json({ error: 'invalid parameters' });
    return
  }

  const apires = await api.getTransactionHistory(req.params.wallet_id, fromTime, toTime,
    startIndex, requestNumber, state);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/blocks', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getWalletBlockInfo(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/addresses/invalid-deposit', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getInvalidDepositAddresses(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/:wallet_id/info', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.getWalletInfo(req.params.wallet_id);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/:wallet_id/addresses/verify', async function(req, res) {
  if (!req.params.wallet_id) {
    res.status(400).json({ error: 'invalid parameters' });
    return;
  }
  const apires = await api.verifyAddresses(req.params.wallet_id, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/callback', async function(req, res) {
  console.log('callback ->', req.body);

  const apiCodeObj = await apicode.getAPICode(req.body.wallet_id).catch(() => {
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
  res.status(200).send('OK');
});

router.post('/withdrawal/callback', function(req, res) {
  console.log('withdrawal/callback ->', req.body);

  // How to verify:
  // 1. Try to find corresponding API secret by req.body.requests:[0].order_id
  // 2. Calculate checksum then compare to X-CHECKSUM header (refer to sample code bellow)
  // 3. If these two checksums match and the request is valid in your system,
  //    reply 200, OK otherwise reply 400 to decline the withdrawal

  // sample code to calculate checksum and verify
  // const payload = JSON.stringify(req.body) + APISECRET
  // const buff = Buffer.from(crypto.createHash('sha256').update(payload).digest());
  // const checksumVerf = buff.toString('base64').replace(/\+/g, "-").replace(/\//g, "_");
  // const checksum = req.get('X-CHECKSUM');
  // if (checksum !== checksumVerf) {
  //   res.status(400).send('Bad checksum');
  // }
  
  res.status(200).send('OK');
});

module.exports = router;
