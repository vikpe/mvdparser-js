export function getDemoDuration(data: Uint8Array): number | null;

export function getMatchDuration(data: Uint8Array): number | null;

export function getKtxstatsAsString(data: Uint8Array): string | null;

export function getServerinfoAsObject(data: Uint8Array): {
    [key: string]: string;
} | null;

export function getServerinfoAsString(data: Uint8Array): string | null;

export function getSha256(data: Uint8Array): Promise<string>;
