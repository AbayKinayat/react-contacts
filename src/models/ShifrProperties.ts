export interface ShifrProperties {
    secretKey: string;
    exp: Date | string,
}

export interface GenerateTokenProperties<Payload> extends ShifrProperties {
    payload: Payload;
}