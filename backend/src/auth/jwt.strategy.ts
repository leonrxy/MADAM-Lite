import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mAdAmL1T3',
        });
    }

    async validate(payload: any) {
        return {
            user_id: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    }
}