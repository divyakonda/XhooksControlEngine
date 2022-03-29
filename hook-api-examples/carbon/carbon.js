// if (process.argv.length < 3) {
//   console.log("Usage: node carbon <account family seed>");
//   process.exit(1);
// }
// const keypairs = require("ripple-keypairs");
// const secret = process.argv[2];
// const address = keypairs.deriveAddress(
//   keypairs.deriveKeypair(secret).publicKey
// );

// const RippleAPI = require("ripple-lib").RippleAPI;
// const fs = require("fs");
// const api = new RippleAPI({ server: "wss://hooks-testnet.xrpl-labs.com" });
// api.on("error", (errorCode, errorMessage) => {
//   console.log(errorCode + ": " + errorMessage);
// });
// api.on("connected", () => {
//   console.log("connected");
// });
// api.on("disconnected", (code) => {
//   console.log("disconnected, code:", code);
// });
// api
//   .connect()
//   .then(() => {
//     binary = fs.readFileSync("carbon.wasm").toString("hex").toUpperCase();
//     j = {
//       Account: address,
//       TransactionType: "SetHook",
//       CreateCode: binary,
//       HookOn: "0000000000000000",
//     };
//     api.prepareTransaction(j).then((x) => {
//       s = api.sign(x.txJSON, secret);
//       console.log(s);
//       api
//         .submit(s.signedTransaction)
//         .then((response) => {
//           console.log(response.resultCode, response.resultMessage);
//           process.exit(0);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     });
//   })
//   .then(() => {})
//   .catch(console.error);

// if (process.argv.length < 3) {
//   console.log("Usage: node carbon <account family seed>");
//   process.exit(1);
// }

const express = require("express");
const router = express.Router();
const path = require("path");

router.post("/", async function (req, res, next) {
  try {
    let response = await carbon(req.body.secret);
    return res.status(200).send({ status: true, message: response });
  } catch (err) {
    if (err.details) {
      return res
        .status(400)
        .send({ status: false, message: err.details[0].message });
    } else {
      console.log(err);
      return res.status(500).send({
        status: false,
        message: err.message ? err.message : "Internal Server Error.",
      });
    }
  }
});

module.exports = router;

function carbon(secret) {
  const keypairs = require("ripple-keypairs");
  // const secret = process.argv[2];
  const address = keypairs.deriveAddress(
    keypairs.deriveKeypair(secret).publicKey
  );

  const RippleAPI = require("ripple-lib").RippleAPI;
  const fs = require("fs");
  const api = new RippleAPI({ server: "wss://hooks-testnet.xrpl-labs.com" });
  api.on("error", (errorCode, errorMessage) => {
    console.log(errorCode + ": " + errorMessage);
  });
  api.on("connected", () => {
    console.log("connected");
  });
  api.on("disconnected", (code) => {
    console.log("disconnected, code:", code);
  });
  return (
    api
      .connect()
      .then(() => {
        binary = fs
          .readFileSync(path.resolve(__dirname, "./carbon.wasm"))
          .toString("hex")
          .toUpperCase();
        j = {
          Account: address,
          TransactionType: "SetHook",
          CreateCode: binary,
          HookOn: "0000000000000000",
        };
        return api.prepareTransaction(j);
      })
      .then((x) => {
        s = api.sign(x.txJSON, secret);
        // console.log(s);
        return api.submit(s.signedTransaction);
      })
      .then((response) => {
        console.log(response.resultCode, response.resultMessage);
        return "Success";
        // process.exit(0);
      })
      // .then(() => {
      //   return "Success";
      // })
      .catch((e) => {
        console.log(e);
        return e;
      })
  );
}
