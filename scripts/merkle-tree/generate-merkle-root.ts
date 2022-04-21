import { program } from 'commander'
import fs from 'fs'
import { parseBalanceMap } from './parse-balance-map'
require('dotenv').config()

program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing a map of account addresses to string balances'
  )

program.parse(process.argv)

const json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }))

if (typeof json !== 'object') throw new Error('Invalid JSON')

const merkleRootAndProofs = JSON.stringify(parseBalanceMap(json))

if (process.env.MERKLE_FILE_NAME == undefined) throw new Error('MERKLE_FILE_NAME must be specified in .env file')

const fileName = process.env.MERKLE_FILE_NAME


// Print root and proofs to root directory
fs.writeFileSync(fileName, merkleRootAndProofs)

console.log(merkleRootAndProofs)

