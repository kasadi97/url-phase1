import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    private getSaltRounds(): number{
        return Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    }

    //registration
    async register(email:string, password:string){
        const existing = await this.prisma.user.findUnique({where: {email}});
        if(existing){
            throw new ConflictException('Email is already in use');
        }

        const saltRounds = this.getSaltRounds();
        const hashed = await bcrypt.hash(password, saltRounds);

        try{
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashed,
                },

            });

            const {password: _pw, ...safe} = user as any;
            return safe;
        } catch(err) {
            //if prisma unique constaint etc...
            throw new InternalServerErrorException('Could not create user');
        }
    }

    //validateUser using during login
    async validateUser(email: string, password: string){
        const user = await this.prisma.user.findUnique({where:{email}});
        if(!user) return null;

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) return null;

        const {password: _pw, ...safe} = user as any;
        return safe; //returning user without password
    }

    //login = giving jwt
    async login(email:string, password: string){
        const user = await this.prisma.user.findUnique({where: {email}});
        if(!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const matches = await bcrypt.compare(password, user.password);
        if(!matches){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = { sub: user.id, email: user.email};
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken: accessToken,
        };
    }
}
