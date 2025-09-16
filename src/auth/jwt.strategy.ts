import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secret',
        });
    }

    async validate(payload: any){
        //payload.sub  -- user id
        const user = await this.prisma.user.findUnique({where:{id:payload.sub}});
        if(!user) throw new UnauthorizedException();
        const {password, ...safe} = user as any;
        return safe; // will be available at request.user
    }
}