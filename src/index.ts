import { Buffer } from "buffer";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

// import * as uts46 from "idna-uts46-hx";
// function normalize(name: string): string {
//   return name ? uts46.toUnicode(name, { useStd3ASCII: false }) : name;
// }

function namehash(name: string): string {
  let node: string =
    "0000000000000000000000000000000000000000000000000000000000000000";

  const s = name.split(".");
  for (let i = s.length - 1; i >= 0; i--) {
    const hash = bytesToHex(keccak_256(s[i]));
    node = bytesToHex(keccak_256(Buffer.from(node + hash, "HEX")));
  }

  return "0x" + node;
}

export { namehash };
