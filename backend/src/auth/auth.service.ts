import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new BadRequestException();
        }
        if (!(await bcrypt.compareSync(password, user.password))) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async generateToken(user: any) {
        const payload = { sub: user.user_id, username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }



}
