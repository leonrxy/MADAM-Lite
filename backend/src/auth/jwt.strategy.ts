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
            id: payload.sub,
            user_id: payload.user_id,
            username: payload.username,
            role: payload.role,
        };
    }
}