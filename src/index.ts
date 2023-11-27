import { Buffer } from "buffer";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

// returns the normalized version of a sns name
//
// supported ASCII listing:
//
// 0-9: 48~57
// a-z: 97~122
// !  : 33
// $  : 36
// (  : 40
// )  : 41
// *  : 42
// +  : 43
// -  : 45
// .  : 46 (dot)
// _  : 95
//
export function normalize(name: string): [boolean, string] {
  const lowerCaseName = name.toLowerCase();
  for (let i = 0; i < lowerCaseName.length; i++) {
    const char = lowerCaseName.charCodeAt(i);
    if (
      (char >= 97 && char <= 122) ||
      (char >= 48 && char <= 57) ||
      char == 33 ||
      char == 36 ||
      // char == 40 ||
      // char == 41 ||
      // char == 42 ||
      // char == 43 ||
      (char >= 40 && char <= 43) ||
      char == 45 ||
      char == 46 ||
      char == 95
    ) {
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
    node = bytesToHex(keccak_256(Buffer.from(node + hash, "hex")));
  }

  return "0x" + node;
}
