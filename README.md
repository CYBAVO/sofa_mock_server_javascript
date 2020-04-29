<a name="table-of-contents"></a>
## Table of contents

- [Get Started](#get-started)
- [Deposit Wallet API](#deposit-wallet-api)
- [Withdraw Wallet API](#withdraw-wallet-api)
- [Query API](#query-api)
- Testing
	- [Mock Server](#mock-server)
	- [CURL Testing Commands](#curl-testing-commands)
	- [Other Language Versions](#other-language-versions)

<a name="get-started"></a>
# Get Started

- Get API code and API secret of the wallet on web console
- Refer to [mock server](#mock-server) sample code 

<a name="deposit-wallet-api"></a>
# Deposit Wallet API

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#create-deposit-wallet-addresses) for detailed API documentation.

<a name="withdraw-wallet-api"></a>
# Withdraw Wallet API

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#withdraw) for detailed API documentation.

<a name="query-api"></a>
# Query API

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#query-api-token-status) for detailed API documentation.

<a name="mock-server"></a>
# Mock Server

### How to compile
- Put sample code to {YOUR\_GO\_PATH}/github.com/cybavo/SOFA\_MOCK\_SERVER
- Execute
	- npm install
	- npm start

> Required version: node v10.19.0 or later (npm v6.13.4 or later)

### Setup configuration
>	Set the backend server URL to the following configuration in mockserver.conf.json

```
"api_server_url": "BACKEND_SERVER_URL"
```

### Put wallet API code/secret into mock server
-	Get API code/secret on web console
	-	API-CODE, API-SECRET, WALLET-ID
- 	Put API code/secret to mock server's database

```
curl -X POST -d '{"api_code":"API-CODE","api_secret":"API-SECRET"}' \
http://localhost:8889/v1/mock/wallets/{WALLET-ID}/apitoken
```

### Register mock server callback URL
>	Operate on web admin console

Notification Callback URL

```
http://localhost:8889/v1/mock/wallets/callback
```

Withdrawal Authentication Callback URL

```
http://localhost:8889/v1/mock/wallets/withdrawal/callback
```

> The withdrawal authentication callback URL once set, every withrawal request will callback this URL to get authentication to proceed withdrawal request.
> 
> Refer to [WithdrawalCallback()](https://github.com/CYBAVO/SOFA_MOCK_SERVER/blob/master/controllers/OuterController.go#L183) function in mock server OuterController.go

<a name="curl-testing-commands"></a>
# CURL Testing Commands

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#curl-testing-commands) for curl testing commands.

<a name="other-language-versions"></a>
# Other Language Versions
- [GO](https://github.com/CYBAVO/SOFA_MOCK_SERVER)
- [JAVA](https://github.com/CYBAVO/SOFA_MOCK_SERVER_JAVA)
