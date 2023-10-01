import { Buffer } from "buffer";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

// returns the normalized version of a sns name
//
// ASCII:
// 48~57 0-9
// 65~90 A-Z
// 97~122 a-z
export function normalize(name: string): [boolean, string] {
  const lowerCaseName = name.toLowerCase();
  for (let i = 0; i < lowerCaseName.length; i++) {
    const char = lowerCaseName.charCodeAt(i);
    if ((char >= 48 && char <= 57) || (char >= 97 && char <= 122)) {
      continue;
    }
    return [false, ""];
  }

  return [true, lowerCaseName];
}

// returns the namehash value of a sns name
export function namehash(name: string): string {
  let node: string =
    "0000000000000000000000000000000000000000000000000000000000000000";

  const s = name.split(".");
  for (let i = s.length - 1; i >= 0; i--) {
    const hash = bytesToHex(keccak_256(s[i]));
    node = bytesToHex(keccak_256(Buffer.from(node + hash, "HEX")));
  }

  return "0x" + node;
}
