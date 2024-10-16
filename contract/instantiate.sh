
# Run the Docker container
cargo build
sudo docker run --rm -v "$(pwd)":/contract \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  enigmampc/secret-contract-optimizer

# Store the contract and capture the output
echo "y" | secretcli tx compute store contract.wasm.gz --gas 5000000 --from myWallet --chain-id secretdev-1

sleep 7
# List the code and capture the output
list_code_output=$(secretcli query compute list-code)

# Extract the last item using jq
last_item=$(echo "$list_code_output" | jq '.[-1]')
echo "Last Item: $last_item"

# Get code_id and code_hash from the last item
last_code_id=$(echo "$last_item" | jq '.code_id')
last_code_hash=$(echo "$last_item" | jq -r '.code_hash')
echo "$last_code_id"
echo "$last_code_hash"
# Create a JSON object dynamically from environment variables
# Instantiate the contract
sleep 3
echo secretcli tx compute instantiate "$last_code_id" \'{"count": 1}\' --from myWallet --label "counterContract$last_code_id" -y
secretcli tx compute instantiate "$last_code_id" '{"count": 1}' --from myWallet --label "counterContract$last_code_id" -y
sleep 5
# List the contracts by code
code_addr=$(secretcli query compute list-contract-by-code "$last_code_id")
echo "$code_addr"
last_item_out=$(echo "$code_addr" | jq '.[-1]')
last_code_addr=$(echo "$last_item_out" | jq '.contract_address')
# Echo the code hash and code id
echo "Last Code Hash: \"$last_code_hash\""
echo "List Code Addr: $last_code_addr"