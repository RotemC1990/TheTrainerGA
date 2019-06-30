import {Injectable} from '@angular/core';

import { Router , CanActivate} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate{


    constructor(private router: Router, private user: UserService){}

    async canActivate(route){
        if(await this.user.isAuthentaicted()) {
            return true;
        } else {
            this.router.navigate['./login'];
            return false;
        }
    }
}