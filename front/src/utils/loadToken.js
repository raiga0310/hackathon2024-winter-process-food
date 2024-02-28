import fs from "node:fs";

const SECRET_TOKENS = '/run/secrets/secret_tokens';

const re_prtimes = /prtimes=?<token>\w+/;
const re_mapbox = /mapbox=?<token>\w+/;

export function loadPrtmiesToken() {
    const data = fs.readFileSync(SECRET_TOKENS, 'utf8').trim();
    const { token } = re_prtimes.exec(data).groups;

    return token
}

export function loadMapboxToken() {
    const data = fs.readFileSync(SECRET_TOKENS, 'utf8').trim();
    const { token } = re_mapbox.exec(data).groups;

    return token
}
