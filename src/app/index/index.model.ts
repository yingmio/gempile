import { HttpService as http } from 'src/services/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IndexModel extends http {
    getMenus() {
        return this.get('/menu');
    }
}