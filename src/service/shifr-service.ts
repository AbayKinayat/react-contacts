import { GenerateTokenProperties, ShifrProperties } from './../models/ShifrProperties';

class ShifrService {
    public static Rot13(secretKey: string): string {
        let newSecretKey = "";
        for (var i = 0; i < secretKey.length; i++) {
            if (secretKey.charCodeAt(i) >= 65 && secretKey.charCodeAt(i) <= 90) {
                newSecretKey += String.fromCharCode((secretKey.charCodeAt(i) + 13 - 65) % 26 + 65);
            } else {
                newSecretKey += String.fromCharCode(secretKey.charCodeAt(i));
            }
        }
        return newSecretKey;
    }

    public static generateToken<Payload>({
        payload,
        exp,
        secretKey
    }: GenerateTokenProperties<Payload>): string {
        const payloadBase64 = btoa(JSON.stringify(payload));
        const signature = btoa(JSON.stringify({
            exp,
            secretKey: ShifrService.Rot13(secretKey)
        }));

        return payloadBase64 + "." + signature;
    }

    public static verifyToken<Payload>(token: string, secretKey: string): Payload | null {
        if (!ShifrService.ValidateToken(token)) {
            return null;
        }
        const tokenArr = token.split(".");
        const payload: Payload = JSON.parse(atob(tokenArr[0]));
        const signature: ShifrProperties = JSON.parse(atob(tokenArr[1]));

        if (!ShifrService.isExpDateLessCurrentDate(new Date(signature.exp))) {
            return null;
        }
        if (!ShifrService.isSecretKeyEqualsByRot13(secretKey, signature.secretKey)) {
            return null;
        }
        return payload;
    }

    public static ValidateToken(token: string): boolean {
        const tokenArr = token.split(".");
        if (tokenArr.length !== 2) {
            return false;
        }
        try {
            JSON.parse(atob(tokenArr[0]));
            JSON.parse(atob(tokenArr[1]));
        } catch (e) {
            return false;
        }
        return true;
    }

    public static createTokenExp(expMonths: number): Date {
        const tokenExp = new Date();
        tokenExp.setMonth(tokenExp.getMonth() + expMonths);
        return tokenExp;
    }

    public static isExpDateLessCurrentDate(exp: Date): boolean {
        return exp > new Date();
    }

    public static isSecretKeyEqualsByRot13(secretKey: string, shifrSecretKey: string) {
        return secretKey === ShifrService.Rot13(shifrSecretKey);
    }

}

export default ShifrService;