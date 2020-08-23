import { environment } from '../../environments/environment';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public static getBaseAPI(): string {
    return environment.uri;
  }

  public getUrl(): string {
    return environment.uri;
}

}
