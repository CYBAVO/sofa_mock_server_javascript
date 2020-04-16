const apicaller = require('./apicaller');

module.exports.createDepositWalletAddresses = async function (walletID, postData) {
  const uri = `/v1/sofa/wallets/${walletID}/addresses`;
  return await apicaller.makeRequest(walletID, "POST", uri, null, postData);
}

module.exports.getDepositWalletAddresses = async function (walletID, startIndex, requestNumber) {
  const uri = `/v1/sofa/wallets/${walletID}/addresses`;
  const params = [
    `start_index=${startIndex}`,
    `request_number=${requestNumber}`,
  ];
  return await apicaller.makeRequest(walletID, "GET", uri, params);
}

module.exports.getDepositWalletPoolAddress = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/pooladdress`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.resendCallback = async function (walletID, postData) {
  const uri = `/v1/sofa/wallets/${walletID}/collection/notifications/manual`;
  return await apicaller.makeRequest(walletID, "POST", uri, null, postData);
}

module.exports.withdrawTransactions = async function (walletID, postData) {
  const uri = `/v1/sofa/wallets/${walletID}/sender/transactions`;
  return await apicaller.makeRequest(walletID, "POST", uri, null, postData);
}

module.exports.getWithdrawTransactionState = async function (walletID, orderID) {
  const uri = `/v1/sofa/wallets/${walletID}/sender/transactions/${orderID}`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.getWithdrawalWalletBalance = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/sender/balance`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.getTxAPITokenStatus = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/apisecret`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.getNotifications = async function (walletID, fromTime, toTime, notificationType) {
  const uri = `/v1/sofa/wallets/${walletID}/notifications`;
  const params = [
    `from_time=${fromTime}`,
    `to_time=${toTime}`,
    `type=${notificationType}`,
  ];
  return await apicaller.makeRequest(walletID, "GET", uri, params);
}

module.exports.getNotificationByID = async function (walletID, postData) {
  const uri = `/v1/sofa/wallets/${walletID}/notifications/get_by_id`;
  return await apicaller.makeRequest(walletID, "POST", uri, null, postData);
}

module.exports.getTransactionHistory = async function (walletID, fromTime, toTime,
  startIndex, requestNumber, state) {
  const uri = `/v1/sofa/wallets/${walletID}/transactions`;
  const params = [
    `from_time=${fromTime}`,
    `to_time=${toTime}`,
    `start_index=${startIndex}`,
    `request_number=${requestNumber}`,
    `state=${state}`,
  ];
  return await apicaller.makeRequest(walletID, "GET", uri, params);
}

module.exports.getWalletBlockInfo = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/blocks`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.getInvalidDepositAddresses = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/addresses/invalid-deposit`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.getWalletInfo = async function (walletID) {
  const uri = `/v1/sofa/wallets/${walletID}/info`;
  return await apicaller.makeRequest(walletID, "GET", uri);
}

module.exports.verifyAddresses = async function (walletID, postData) {
  const uri = `/v1/sofa/wallets/${walletID}/addresses/verify`;
  return await apicaller.makeRequest(walletID, "POST", uri, null, postData);
}
