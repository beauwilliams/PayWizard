# PayWizard
PayWizard is the Paymasters master. Sorcerer of AA. Manage a fleet of paymasters using JIT liquidity provisioning. 

Steps to test drive PayWizard.

1. Upon deploying the PayWizard Smart Contract, set minWaitPeriodSeconds for example to 60 (interval 60s). Set this to a value that best suits the needs of your application (note: this is a cost to your application in $LINK).

2. Trigger `setWatchList` with values (for demonstration purposes you can use one or many wallet addresses), minimum balance per account, and amount to top up per account.

3. Once complete, navigate to ChainLink `https://automation.chain.link/new-custom-logic` and register the custom smart contract. 

- Project name
- $LINK starting balance 2
- Add any custom details required / optional

4. Wait for completion and then select the new upkeep when shown in the page.

5. Details will be shown of the setup. This is now a place where you can experiment with sending transactions to lower balances which will trigger an automatic topup of funds to that account(s)

6. The next steps for this project are to take this base solution and create a user interface which can display these values and include controls for the end user to manage multi-account AA scenarios where gas is required just-in-time to ensure availability of a service(s).
