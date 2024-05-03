# Declaratively set shell recipes a.k.a commands should run in
set shell := ["bash", "-uc"]

# Load environment variables
set dotenv-load := true
# apikey:
#    echo " from .env"

# set positional-arguments := true
# foo:
#   echo justinit
#   echo

# Colours

RED:= "\\033[31m"
GREEN:= "\\033[32m"
YELLOW:= "\\033[33m"
BLUE:= "\\033[34m"
MAGNETA:= "\\033[35m"
CYAN:= "\\033[36m"
WHITE:= "\\033[37m"
BOLD:= "\\033[1m"
UNDERLINE:= "\\033[4m"
INVERTED_COLOURS:= "\\033[7m"
RESET := "\\033[0m"
NEWLINE := "\n"

# Recipes

default:
    @#This recipe will be the default if you run just without an argument, e.g list out available commands
    @just --list --unsorted --list-heading $'{{BOLD}}{{GREEN}}Available recipes:{{NEWLINE}}{{RESET}}'
install *PACKAGES:
	@npm install {{PACKAGES}}
update:
	@npm update
compile:
	@npm run compile
compile-watch:
    @just _bold_red "Watching for changes to contracts and auto-compiling"
    @npm run compile-watch
deploy NETWORK TAGS GAS_PRICE:
	@npx hardhat --network {{NETWORK}} deploy --tags {{TAGS}} --gasprice {{GAS_PRICE}}
deploy-all-local:
	@npx hardhat --network hardhat deploy
deploy-mumbai CONTRACT:
	@npx hardhat --network mumbai deploy --tags {{CONTRACT}}
deploy-all-mumbai:
	@npx hardhat --network mumbai deploy
deploy-polygon CONTRACT:
	@npx hardhat --network mumbai deploy --tags {{CONTRACT}}
export-deployments:
	@npx hardhat export --export-all ./cache/deployments.json
verify-mumbai:
	@npx hardhat --network mumbai etherscan-verify
verify-polygon:
	@npx hardhat --network polygon etherscan-verify
verify *NETWORK:
	@npx hardhat --network {{NETWORK}} etherscan-verify
test:
	@npm run test
test-watch:
    @just _bold_red "Watching for changes to tests and auto-testing"
    @npm run test-watch
lint:
	@npm run lint
start:
	@#Start a local hardhat blockchain instance localhost:8545
	@npm run node
format:
	@npm run format
coverage:
	@npx hardhat coverage
flatten *CONTRACT:
	@npx hardhat flatten {{CONTRACT}} > flattened.sol
audit:
	@npm run audit
print-audit:
	@npm run print-audit
print-gas-usage:
	@npm run print-gas-usage
print-deployments:
	@cat deployments/deploy.ts
clean:
    @just _bold_red "WARNING: this operation will delete the contracts, caches etc and reset this repo to a blank state for starting a new solidity project. This operation can't be undone."
    @just _bold_red "Would you like to proceed?"
    @./scripts/clean.sh

_bold_red message:
    @#Hidden recipes have _ in front, i.e these can be helpers such as pretty printer below
    @echo -e "{{BOLD}}{{RED}}{{message}}{{RESET}}"
remix:
	open http://remix.ethereum.org && remixd -s . --remix-ide http://remix.ethereum.org
mineblock-4weeks:
	npx hardhat --network localhost increaseTime "4 weeks" && npx hardhat --network localhost mine

