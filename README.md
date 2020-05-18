<a name="table-of-contents"></a>
## Table of contents

- [Get Started](#get-started)
- [Deposit Wallet API](#deposit-wallet-api)
- [Withdraw Wallet API](#withdraw-wallet-api)
- [Query API](#query-api)
- Testing
	- [Mock Server](#mock-server)
	- [cURL Testing Commands](#curl-testing-commands)
	- [Other Language Versions](#other-language-versions)

<a name="get-started"></a>
# Get Started

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#get-started) for detailed introduction.

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

> Required version: node v10.19.0 or later (npm v6.13.4 or later)

- Commands
	- $ npm install
	- $ npm start


### Setup configuration

>	Configure CYBAVO API server URL in mockserver.conf.json

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
> Refer to /callback handler in mock server wallets.js

<a name="curl-testing-commands"></a>
# cURL Testing Commands

Refer to [here](https://github.com/CYBAVO/SOFA_MOCK_SERVER#curl-testing-commands) for curl testing commands.

<a name="other-language-versions"></a>
# Other Language Versions
- [Go](https://github.com/CYBAVO/SOFA_MOCK_SERVER)
- [Java](https://github.com/CYBAVO/SOFA_MOCK_SERVER_JAVA)
- [PHP](https://github.com/CYBAVO/SOFA_MOCK_SERVER_PHP)
