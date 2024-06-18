# mvdparser-js
> Extract information from QuakeWorld MVD demos.

```ts
function getDemoDuration(data: Uint8Array) : number | null {}
function getMatchDuration(data: Uint8Array) : number | null {} 
function getKtxstatsAsString(data: Uint8Array) : string | null {} 
function getServerinfoAsObject(data: Uint8Array) : { [key: string]: string } | null {} 
function getServerinfoAsString(data: Uint8Array) : string | null {} 
function getSha256(data: Uint8Array) : string | null {}
```
