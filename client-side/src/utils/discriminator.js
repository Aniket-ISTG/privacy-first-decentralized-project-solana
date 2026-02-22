import { sha256 } from "@noble/hashes/sha256";

export function getDiscriminator(name) {
  return Buffer.from(
    sha256(`global:${name}`).slice(0, 8)
  );
}