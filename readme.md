### Arweave Transaction Downloader
This tool simply allows you to download transactions from the Arweave Blockchain and save them to a file. 

How to use
---
```
node downloader.js --output <file_name> --transaction <tx_id> 

Options:
      --help         Show help.                                        [boolean]
  -e, --encoding     Possible encodings:  utf8,base64,base64url,hex. Default "ba
                     se64url"                                           [string]
  -t, --transaction  Transaction id on Arweave               [string] [required]
  -o, --output       Output filename                         [string] [required]
  -c, --concurrency  Promise concurrency limit. Default: Infinity       [number]
```


Example
---
```
> node downloader.js -o testfile.data -t xYOCtyCdQIRXuKF-u6W-zudsFL_uh4ycMLxIcOWxSfU -c 100 
┌──────────────────┬───────────────────────────────────────────────┐
│     (index)      │                    Values                     │
├──────────────────┼───────────────────────────────────────────────┤
│     encoding     │                  'base64url'                  │
│  transactionID   │ 'xYOCtyCdQIRXuKF-u6W-zudsFL_uh4ycMLxIcOWxSfU' │
│     fileName     │                'testfile.data'                │
│ concurrencyLimit │                      100                      │
└──────────────────┴───────────────────────────────────────────────┘
Downloading 32633795 bytes of data...
 ████████████████████████████████████████ 100% | ETA: 0s | 125/125
Data saved in testfile.data
```


Dependencies (Node v16.15.0)
---
```
    "axios": "^1.1.3",
    "cli-progress": "^3.11.2",
    "p-limit": "^4.0.0",
    "yargs": "^17.6.0"
```

Used Dev dependencies for TS development
---
```
    "@types/p-limit": "^2.2.0",
    "@types/axios": "^0.14.0",
    "@types/cli-progress": "^3.11.0",
    "@types/node": "^18.11.0",
    "@types/yargs": "^17.0.13",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.4"
```