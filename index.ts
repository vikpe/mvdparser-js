export function getDemoDuration(data: Uint8Array): number | null {
	const matchDuration = getMatchDuration(data);
	return matchDuration ? matchDuration + 10 : null;
}

export function getMatchDuration(data: Uint8Array): number | null {
	const MAX_LOOKBEHIND = 1024 * 48;
	const dataAsStr = new TextDecoder().decode(data.slice(-MAX_LOOKBEHIND));
	const match = dataAsStr.match(/"duration": (\d+)/);
	return match ? Number.parseInt(match[1]) : null;
}

export function getKtxstatsAsString(data: Uint8Array): string | null {
	const MAX_LOOKBEHIND = 1024 * 48;
	const dataAsStr = new TextDecoder().decode(data.slice(-MAX_LOOKBEHIND));
	const match = dataAsStr.match(/.+({"version": .+})/);
	return match ? match[1] : null;
}

export function getServerinfoAsObject(
	data: Uint8Array,
): { [key: string]: string } | null {
	const serverinfoString = getServerinfoAsString(data);

	if (null === serverinfoString) {
		return null;
	}

	const parts = serverinfoString.split("\\");
	const serverInfo: { [key: string]: string } = {};

	for (let i = 1; i < parts.length; i += 2) {
		serverInfo[parts[i]] = parts[i + 1];
	}

	return serverInfo;
}

export function getServerinfoAsString(data: Uint8Array): string | null {
	const MAX_LOOKAHEAD = 1024;
	const dataAsStr = String.fromCharCode(...data.slice(0, MAX_LOOKAHEAD));
	const match = dataAsStr.match(/fullserverinfo "(.+)"/);
	return match ? match[1] : null;
}

export async function getSha256(data: Uint8Array) {
	const hashBuf = await window.crypto.subtle.digest("SHA-256", data);
	const byteArr = Array.from(new Uint8Array(hashBuf));
	return byteArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}
