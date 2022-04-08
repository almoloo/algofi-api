const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const algosdk = require("algosdk");
const algofi = require("../lib/lend.cjs.development");
const { route } = require("express/lib/application");
const IS_MAINNET = true;
const user = algosdk.mnemonicToSecretKey(process.env.MNEMONIC);
const sender = user.addr;
const algodClient = new algosdk.Algodv2("", "https://api.algoexplorer.io", "");
const testAlgodClient = new algosdk.Algodv2(
  "",
  "https://api.testnet.algoexplorer.io",
  ""
);
const indexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.algoexplorerapi.io",
  ""
);

const testIndexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.testnet.algoexplorerapi.io",
  ""
);

const historicalIndexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.algoexplorerapi.io/",
  ""
);
const testHistoricalIndexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.testnet.algoexplorerapi.io/",
  ""
);

const clientPromise = async () => {
  return IS_MAINNET
    ? await algofi.newAlgofiMainnetClient(
        algodClient,
        indexerClient,
        historicalIndexerClient,
        sender
      )
    : await algofi.newAlgofiTestnetClient(
        testAlgodClient,
        testIndexerClient,
        testHistoricalIndexerClient,
        sender
      );
};

// ---------- GET MARKETS ----------
router.get("/getmarkets", async (req, res, next) => {
  const client = await clientPromise();
  const marketsData = [];
  for (let market in client.markets) {
    let newData = client.markets[market];
    newData["market"] = market;
    delete newData.algod;
    delete newData.historicalIndexer;
    delete newData.asset.algod;
    marketsData.push(Object.assign({ market: market }, newData));
  }
  res.json(marketsData);
});

// ---------- GET MANAGER ----------
router.get("/getmanager", async (req, res, next) => {
  const client = await clientPromise();
  const managerData = client.manager;
  delete managerData.algod;
  delete managerData.rewardsProgram.algod;
  res.json(managerData);
});

// ---------- GET STAKING CONTRACT INFO ----------
router.get("/getstakingcontract", async (req, res, next) => {
  const client = await clientPromise();
  const stakingContractData = client.stakingContractInfo;
  res.json(stakingContractData);
});

// ---------- GET MAX ATOMIC OPT-IN ORDERED SYMBOLS ----------
router.get("/getmaxatomicorderedsymbols", async (req, res, next) => {
  const client = await clientPromise();
  const maxAtomicOrderedSymbols = client.maxAtomicOptInOrderedSymbols;
  res.json(maxAtomicOrderedSymbols);
});

// ---------- GET MAX ORDERED SYMBOLS ----------
router.get("/getmaxorderedsymbols", async (req, res, next) => {
  const client = await clientPromise();
  const maxOrderedSymbols = client.maxOrderedSymbols;
  res.json(maxOrderedSymbols);
});

// ---------- GET ACTIVE ORDERED SYMBOLS ----------
router.get("/getactiveorderedsymbols", async (req, res, next) => {
  const client = await clientPromise();
  const activeOrderedSymbols = client.activeOrderedSymbols;
  res.json(activeOrderedSymbols);
});

// ---------- GET ACCOUNTS FROM APPID ----------
router.get("/getaccountsfromappid", async (req, res, next) => {
  const appid = req.query["appid"];
  const onlyAddress = req.query["onlyAddress"] === "true";
  const appidUrl = `https://algoindexer.algoexplorerapi.io/v2/accounts?application-id=${appid}`;
  const response = await fetch(appidUrl);
  const json = await response.json();
  if (onlyAddress) {
    const accounts = json.accounts.map(account => account.address);
    res.json(accounts);
  } else {
    res.json(json.accounts);
  }
});

// ---------- GET MARKET APPID FROM SYMBOL ----------
router.get("/getmarketappid", async (req, res, next) => {
  const symbol = req.query["symbol"];
  const client = await clientPromise();
  if (client.markets[symbol] === undefined) res.json({});
  res.json({
    appid: client.markets[symbol].asset.underlyingAssetInfo.managerAppId
  });
});

// ---------- GET STORAGE STATE ----------
router.get("/getstoragestate", async (req, res, next) => {
  const appId = parseInt(req.query["appid"]);
  const address = req.query["address"];
  const newManager = await algofi.Manager.init(algodClient, appId);
  try {
    res.json(await newManager.getStorageState(address));
  } catch (e) {
    res.json({ error: e });
  }
});

// ---------- GET USERS WITH VALUE FROM SYMBOL ----------
router.get("/getstorages", async (req, res, next) => {
  const symbol = req.query["symbol"];
  const client = await clientPromise();
  if (client.markets[symbol] === undefined) res.json({});
  const appid = client.markets[symbol].asset.underlyingAssetInfo.managerAppId;
  const accounts = await fetch(
    `http://localhost:3000/api/getaccountsfromappid?appid=${appid}&onlyAddress=true`
  );
  const accountsJson = await accounts.json();
  let storages = [];
  let validStorages = [];
  if (accountsJson.length > 0) {
    accountsJson.forEach(async account => {
      const storageState = await fetch(
        `http://localhost:3000/api/getstoragestate?appid=${appid}&address=${account}`
      );
      const storageJson = await storageState.json();
      const tempStorage = {
        address: account,
        storageState: storageJson
      };
      storages.push(tempStorage);
      if (
        storageJson["user_global_max_borrow_in_dollars"] > 0 ||
        storageJson["user_global_borrowed_in_dollars"] > 0
      ) {
        validStorages.push(tempStorage);
      }
      if (storages.length === accountsJson.length) {
        res.json(validStorages);
      }
    });
  } else {
    res.json(storages);
  }
});

module.exports = router;
