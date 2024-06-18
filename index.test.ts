import * as fs from "node:fs";
import {describe, expect, test} from "vitest";

import {
    getDemoDuration,
    getKtxstatsAsString,
    getMatchDuration,
    getServerinfoAsObject,
    getServerinfoAsString,
    getSha256,
} from "./index";

const demo1on1 = fs.readFileSync(
    "./test_files/20240617-1927_1on1_dago_vs_floc[aerowalk].mvd",
);
const stats1on1 = fs.readFileSync(
    "./test_files/20240617-1927_1on1_dago_vs_floc[aerowalk].mvd.ktxstats.json",
    {encoding: "utf8"},
);

describe("mvdparser", () => {
    test("getDemoDuration", () => {
        expect(getDemoDuration(new Uint8Array())).toEqual(null);
        expect(getDemoDuration(demo1on1)).toEqual(610);
    });

    test("getMatchDuration", () => {
        expect(getMatchDuration(new Uint8Array())).toEqual(null);
        expect(getMatchDuration(demo1on1)).toEqual(600);
    });

    test("getKtxstatsAsString", () => {
        expect(getKtxstatsAsString(new Uint8Array())).toEqual(null);
        expect(getKtxstatsAsString(demo1on1)).toEqual(stats1on1);
    });

    test("getServerinfoAsString", () => {
        expect(getServerinfoAsString(new Uint8Array())).toEqual(null);
        expect(getServerinfoAsString(demo1on1)).toEqual(
            "\\maxfps\\77\\pm_ktjump\\1\\*version\\MVDSV 0.35\\*z_ext\\511\\maxspectators\\12\\*admin\\dago <janschulzpro@gmail.com>\\ktxver\\1.42\\sv_antilag\\2\\hostname\\Das Pentagon Clanserver:28501\\*gamedir\\qw\\fpd\\206\\timelimit\\10\\deathmatch\\3\\*qvm\\so\\*progs\\so\\map\\aerowalk\\maxclients\\2\\mode\\1on1\\status\\Countdown\\serverdemo\\duel_dago_vs_floc[aerowalk]20240617-2127.mvd",
        );
    });

    test("getServerinfoAsObject", () => {
        expect(getServerinfoAsObject(new Uint8Array())).toEqual(null);
        expect(getServerinfoAsObject(demo1on1)).toEqual({
            "*admin": "dago <janschulzpro@gmail.com>",
            "*gamedir": "qw",
            "*progs": "so",
            "*qvm": "so",
            "*version": "MVDSV 0.35",
            "*z_ext": "511",
            deathmatch: "3",
            fpd: "206",
            hostname: "Das Pentagon Clanserver:28501",
            ktxver: "1.42",
            map: "aerowalk",
            maxclients: "2",
            maxfps: "77",
            maxspectators: "12",
            mode: "1on1",
            pm_ktjump: "1",
            serverdemo: "duel_dago_vs_floc[aerowalk]20240617-2127.mvd",
            status: "Countdown",
            sv_antilag: "2",
            timelimit: "10",
        });
    });

    test("getSha256", async () => {
        expect(await getSha256(new Uint8Array())).toEqual(
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        );
        expect(await getSha256(demo1on1)).toEqual(
            "51d908e2f09947e9602bd498516a25b42356e7e5614a7b222ca56a099aed4757",
        );
    });
});
