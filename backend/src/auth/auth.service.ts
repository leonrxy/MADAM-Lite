import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new HttpException({ status: "failed", message: 'User not found' }, HttpStatus.NOT_FOUND,);
        }
        if (!(await bcrypt.compareSync(password, user.password))) {
            throw new HttpException({ status: "failed", message: 'Invalid Password' }, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async login(user: any) {
        const payload = { sub: user.user_id, username: user.username, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            success: true,
            message: 'Login Successful',
            data: {
                token: token,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                }
            }
        };
    }

}
