import { Injectable } from '@angular/core';
import { HttpParams, HttpRequest, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Util } from '../utils/util';
import { Router } from '@angular/router';
import { MessagingService } from './messaging.service';
import { ModalMessage } from '../shared/modelos/modal-message';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService<T> {
  private url: string;

  public progress = new ProgressSpinnerComponent();
  public contador = 0;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly rotaService: Router,
    private readonly messagingService: MessagingService
  ) { }

  carregando(): void {
    if (this.contador === 0 ){
       this.progress.getVisible();
    }
    this.contador++;
  }

  carregado(): void {
    this.contador--;
    if (this.contador === 0 ){
       this.progress.getVisible();
    }
  }

  get(httpParams?: HttpParams, url?: string): Promise<Array<any>> {
    this.url = url;
    const header = this.getHeaders();
    this.carregando();

    return this.httpClient.get<Array<any>>(this.url, {
      headers: header,
      params: httpParams,
      responseType: 'json'
    })
    .pipe(map((response) => this.handleResponse(response)),
          catchError((err) => this.handleError(err)))
    .toPromise();
  }

  public post(t: T, url?: string): Promise<any> {
    this.url = url;
    const payLoad = JSON.stringify(t);
    this.carregando();

    return this.httpClient.post(this.url, payLoad,
      {
        headers: this.getRequestOptionsContentTypeJson(),
        responseType: 'json'
      })
      .pipe(map((response) => this.handleResponseAny(response)),
            catchError((err) => this.handleError(err)))
      .toPromise();
  }

  public getByIdCli(urlpath: string, httpParams?: HttpParams): Promise<T> {
    this.url = urlpath;
    const header = this.getHeaders();
    this.carregando();
    return this.httpClient.get<T>(this.url, {
      headers: header,
      params: httpParams,
      responseType: 'json'
    })
    .pipe(map((response) => this.handleResponseT(response)),
          catchError((err) => this.handleError(err)))
    .toPromise();
  }

  public put(t: T, url?: string): Promise<any> {
    this.url = url;
    const payLoad = JSON.stringify(t);
    const header = this.getRequestOptionsContentTypeJson();
    this.carregando();
    return this.httpClient.put(this.url, payLoad, { headers: header })
    .pipe(map((response) => this.handleResponseAny(response)),
          catchError((err) => this.handleError(err)))
    .toPromise();
  }

  public delete(url: string): Promise<any> {
    this.url = url;
    this.carregando();
    return this.httpClient.delete(this.url,
      { headers: this.getHeaders() })
      .pipe(map((response) => this.handleResponseAny(response)),
            catchError((err) => this.handleError(err)))
      .toPromise();
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  setError(error: any): any {
    return Promise.reject(error.json() || 'Error!');
  }

  public getParam(): any {
    return new HttpParams();
  }

  public handleMessage(response): any {
    if (!response) {
      return;
    }
    if (!(response['title'] && response['message'] && response['type'])) {
      return;
    }
    this.messagingService.message.emit(new ModalMessage(response['title'], response['message'], response['typeInt'], response['type']));
  }

  public handleResponse = (response: T[]) => {
    this.handleMessage(response);
    this.carregado();
    return response;
  }

  public handleResponseT = (responseT: T) => {
    this.handleMessage(responseT);
    this.carregado();
    return responseT;
  }

  public handleResponseAny = (responseAny: any) => {
    this.handleMessage(responseAny);
    this.carregado();
    return responseAny;
  }

  public handleResponseTBlob = (response: any) => {
    this.carregado();
    return new Blob([response.body]);
  }

  public handleError = (error: HttpErrorResponse) => {
    if (error) {
      const message = error.error;
      if (message['title'] && message['message'] && message['type']) {
        this.messagingService.message.emit(new ModalMessage(message['title'], message['message'], message['typeInt'], message['Type']));
      } else {
        if (error.statusText === 'Token expirado') {
          this.messagingService.message.emit(new ModalMessage('Alerta', 'Tempo de sessão expirado.', 1, 'warning'));
        } else if (error.message.indexOf('Http failure') !== -1) {
          this.messagingService.message.emit(new ModalMessage('Erro', 'Não foi possível se comunicar com o servidor.', 1, 'danger'));
        }
        this.logouf();
      }
    }
    if (error.status === 521) {
      return Observable.throwError({ status: error.status, Mensagem: error.statusText });
    }
  }

  private logouf(): void {
    this.rotaService.navigate(['/']);
  }

  public download(url: string, obj: T): Observable<Blob> {
    const header = this.getRequestOptionsContentTypeJsonBlob();
    const payLoad = JSON.stringify(obj);

    return this.httpClient
      .post(url, payLoad, {
        headers: header,
        observe: 'response',
        responseType: 'blob'
      })
      .pipe(map((response) => this.handleResponseTBlob(response)),
            catchError((err) => this.handleError(err)));
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  }

  protected getRequestOptionsContentTypeJson(): HttpHeaders {
    return this.getHeaders().append('Content-type', 'application/json');
  }

  protected getRequestOptionsContentTypeJsonBlob(): HttpHeaders {
    return this.getRequestOptionsContentTypeJson().set('ResponseContentType', 'Blob');
  }

  public downloadRelatorio(url: string, obj: T): Observable<Blob> {
    const header = this.getRequestOptionsContentTypeJsonBlob();
    const payLoad = JSON.stringify(obj);

    return this.httpClient
      .post(url, payLoad, {
        headers: header,
        observe: 'response',
        responseType: 'blob'
      })
      .map(response => this.handleResponseTBlob(response))
      .catch(err => this.handleErrorRelatorio(err));
  }

  public handleErrorRelatorio = (error: HttpErrorResponse) => {
    const message = error.error;
    if (message && message['Title'] && message['Message'] && message['Type']) {
      this.messagingService.message.emit(new ModalMessage(message['Title'], message['Message'], message['TypeInt'], message['Type']));
    }
    if (error.status === 521) {
      return Observable.throwError({ status: error.status, Mensagem: error.statusText });
    } else if (error.status === 401) {
      this.logouf();
      return Observable.throwError('');
    } else if (error.status === 500) {
      return Observable.throwError(error.error);
    } else {
      return Observable.throwError(error);
    }
  }
}
