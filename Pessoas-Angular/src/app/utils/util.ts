import { ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { HtmlElement } from '../shared/modelos/html-element';
import { TypeExportReport } from '../shared/constantes/type-export-report.enum';
import { ValidationResult } from './validation-result.d';

export class Util {

  public static get trueFunc(): any {
    return () => {
      return true;
    };
  }

  public static get falseFunc(): any {
    return () => {
      return false;
    };
  }

  public static get nullFunc(): any {
    return () => {};
  }

  public static ordenacao = (ini: any, fim: any, campo = 'Descricao') => {
    let retorno = 0;
    if (isNaN(ini[campo]) && isNaN(fim[campo])) {
      if (ini[campo].toUpperCase() > fim[campo].toUpperCase()) {
        retorno = 1;
      }
      if (ini[campo].toUpperCase() < fim[campo].toUpperCase()) {
        retorno = -1;
      }
    } else {
      if (ini[campo] > fim[campo]) {
        retorno = 1;
      }
      if (ini[campo] < fim[campo]) {
        retorno = -1;
      }
    }
    return retorno;
  }

  public static completarComZero(elemento: HtmlElement, tamanho: number, align = 'left'): string {
    let retorno = Util.removerMascaraGenerica(elemento.Value);
    if (retorno.length === 0) {
      return;
    }
    while (retorno.length < tamanho) {
      retorno = align === 'left' ? '0' + retorno : retorno + '0';
    }
    elemento.Value = retorno;
  }

  public static completarStringComZero(valorString: string, tamanho: number, align = 'left'): string {
    valorString = Util.removerMascaraGenerica(valorString);
    if (Util.isNullOrEmpty(valorString)) {
      return '';
    }
    while (valorString.length < tamanho) {
      valorString = align === 'left' ? '0' + valorString : valorString + '0';
    }
    return valorString;
  }

  public static removerZerosEsquerda(elemento: HtmlElement): string {
    let retorno = Util.removerMascaraGenerica(elemento.Value);
    while (retorno.substr(0, 1) === '0') {
      retorno = retorno.substr(1, retorno.length);
    }
    return retorno;
  }

  public static aplicarMascaraString(valor: string, mascara: string): string {
    const str = '' + valor;
    let result = '';
    for (let im = 0, is = 0; im < mascara.length && is < str.length; im++) {
      if (mascara.charAt(im) === 'X') {
        result += str.charAt(is);
        is++;
      } else {
        result += mascara.charAt(im);
      }
    }
    return result;
  }

  public static resetForm(formulario: FormGroup): void {
    formulario.reset();
  }

  public static autoFocusChecked(element: ElementRef): void {
    setTimeout(() => element.nativeElement.focus(), 100);
  }

  public static onValueChanged(formErrors: any, formulario: FormGroup, validationMessages: any): void {
    for (const campo in formErrors) {
      if (!isNullOrUndefined(campo)) {
        this.controlFormularioChangedErrors(formErrors, formulario, validationMessages, campo);
      }
    }
  }

  private static controlFormularioChangedErrors(formErrors: any, formulario: FormGroup, validationMessages: any, campo): void {
    const control = formulario.get(campo);
    if (control && !control.valid) {
      const messages = validationMessages[campo];
      for (const key in control.errors) {
        if (formErrors[campo].findIndex(error => error === messages[key]) === -1) {
          formErrors[campo].push(messages[key]);
        }
      }
    }
  }

  public static formataIE(inscricao: string): string {
    if (this.isNullOrEmpty(inscricao) || inscricao.toString() === '0') {
      return '';
    }
    let numIE = Util.completarStringComZero(inscricao, 10);
    numIE = numIE
      .substring(0, 3).concat('.').concat(numIE.substring(3, 6))
      .concat('.').concat(numIE.substring(6, 9));
    return numIE;
  }

  public static formatCPFCNPJ(value: string): string {
    if (value) {
      value = value.toString();
      if (value.length === 11) {
        return value
          .substring(0, 3).concat('.').concat(value.substring(3, 6))
          .concat('.').concat(value.substring(6, 9)).concat('-').concat(value.substring(9, 11));
      } else if (value.length === 14) {
        return value
          .substring(0, 2).concat('.').concat(value.substring(2, 5)).concat('.')
          .concat(value.substring(5, 8)).concat('/').concat(value.substring(8, 12))
          .concat('-').concat(value.substring(12, 14));
      }
    }
    return value;
  }

  public static extrairBaseCpfCnpj(numCpfCnpj?: string): string {
    if (numCpfCnpj != null) {
      numCpfCnpj = Util.removerMascaraCPFCNPJ(numCpfCnpj);
      if (numCpfCnpj.length === 11) {
        return numCpfCnpj.substring(0, 9);
      }
      if (numCpfCnpj.length === 14) {
        return numCpfCnpj.substring(0, 8);
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  public static formataCEP(cep?: any): string {
    if (cep && cep.toString().length < 8) {
      return cep.toString().padStart(8, '0');
    }
    return cep;
  }
  public static extrairFilialCpfCnpj(numCpfCnpj?: string): string {
    if (! this.isNullOrEmpty(numCpfCnpj)) {
      numCpfCnpj = Util.removerMascaraCPFCNPJ(numCpfCnpj);
      if (numCpfCnpj.length === 11) {
        return '0';
      }
      if (numCpfCnpj.length === 14) {
        return numCpfCnpj.substring(8, 12);
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  public static extrairDigitoCpfCnpj(numCpfCnpj?: string): string {
    if (! this.isNullOrEmpty(numCpfCnpj)) {
      numCpfCnpj = Util.removerMascaraCPFCNPJ(numCpfCnpj);
      if (numCpfCnpj.length === 11) {
        return numCpfCnpj.substring(9, 11);
      }
      if (numCpfCnpj.length === 14) {
        return numCpfCnpj.substring(12, 14);
      }
    }
    return '';
  }

  public static objectWithoutProperties(obj1: any, obj: any, keys: Array<any>): any {
    const target: any = {};
    for (const i in obj) {
      if (keys.indexOf(i) < 0 && Object.prototype.hasOwnProperty.call(obj, i)) {
        target[i] = obj[i];
      }
    }
    return Object.assign(obj1, target);
  }

  public static validarPeriodos(inicial, final): number {
    let diff = 0;
    if (! this.isNullOrEmpty(inicial) && ! this.isNullOrEmpty(final)) {
      diff = Date.parse(inicial) - Date.parse(final);
    }
    return diff;
  }

  public static getDateFromNgb(ngbDate: any): Date {
    let date: Date;
    if (ngbDate !== null) {
      date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    }
    return date;
  }

  public static FormataToBack(dtValor: any): Date {
    let date: Date;
    if (dtValor !== null) {
      date = new Date(dtValor.month, dtValor.day, dtValor.year);
    }
    return date;
  }

  public static getNgbDateFromDate(data: any): Date {
    const date = new Date(data);
    let ngbDate: any;
    if (date !== null) {
      ngbDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    return ngbDate;
  }

  public static getAnyDateToString(data: any): string {
    const day = data.getDate().toString().padStart(2, '0');
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear();
    return `${day}/${month}/${year}`;
  }

  public static removerMascaraCPFCNPJ(str?: string): string {
    if (str != null) {
      try {
        return str.replace(/[^\d\s]/g, '');
      } catch (ex) {
        return '';
      }
    } else {
      return '';
    }
  }

  public static removerCaracteresEspeciais(str?: string): string {
    if (str != null) {
      try {
        return str.toString().replace(/[^A-Za-z0-9]/gi, '');
      } catch (ex) {
        return '';
      }
    } else {
      return '';
    }
  }

  /*
  public static alteraTab(tabs: NgbTabset, valid): any {
    if (!valid[0]) {
      tabs.select('ngtabNota');
      return;
    }
    if (!valid[1] || !valid[2] || !valid[3] || !valid[4]) {
      tabs.select('ngtabNotaRemetDest');
      return;
    }
    if (!valid[5]) {
      tabs.select('ngtabItemNota');
      return;
    }
  }
  */

  public static removerCaracteresEspeciaisTexto(str?: string): string {
    if (str != null) {
      try {
        return str.toString().replace(/[^a-z0-9 áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/gi, '');
      } catch (ex) {
        return '';
      }
    } else {
      return '';
    }
  }
  public static removerMascaraGenerica(str?: string): string {
    if (! this.isNullOrEmpty(str)) {
      try {
        return str.toString().replace(/[^\d\s]/g, '');
      } catch (ex) {
        return '';
      }
    } else {
      return '';
    }
  }
  public static removerMascaras(obj, except = null): any {
    const response = {};
    for (const prop in obj) {
      if (prop && (typeof prop === 'string' || typeof prop === 'number')) {
        if ((typeof obj[prop] === 'string' || typeof obj[prop] === 'number') && !(except && except.find(ex => ex === prop))) {
          response[prop] = this.removerMascaraGenerica(String(obj[prop]));
        } else {
          response[prop] = obj[prop];
        }
      }
    }
    return response;
  }
  public static apenasNumeros(event: any): boolean {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return true;
    } else {
      return false;
    }
  }
  private static pontuarCnpjCpf(CNPJCPFBase, CNPJCPFFilial, DigCnpjCpf, ehPessoaJuridica = false): string {
    let retorno;
    if (Number(CNPJCPFFilial) > 0 || ehPessoaJuridica) {
      retorno =
        `${CNPJCPFBase.toString().slice(0, 2)}.${CNPJCPFBase.toString().slice(2, 5)}
        .${CNPJCPFBase.toString().slice(5, 8)}/${CNPJCPFFilial.toString()}-${DigCnpjCpf.toString()}`;
    } else {
      retorno = `${CNPJCPFBase.toString().slice(0, 3)}.&{CNPJCPFBase.toString().slice(3, 6)}
        .${CNPJCPFBase.toString().slice(6, 9)}-${DigCnpjCpf.toString()}`;
    }
    return retorno;
  }

  // tslint:disable-next-line:member-ordering
  public static formataCnpjCpf(CNPJCPFBase: any, CNPJCPFFilial: any, DigCnpjCpf: any, ehPessoaJuridica = false): string {
    let valorRetorno = '';
    CNPJCPFBase = CNPJCPFBase != null ? CNPJCPFBase : 0;
    CNPJCPFFilial = CNPJCPFFilial != null ? Number(CNPJCPFFilial) : 0;
    DigCnpjCpf = DigCnpjCpf != null ? DigCnpjCpf : 0;
    ehPessoaJuridica = CNPJCPFBase + CNPJCPFFilial === 0 ? true : ehPessoaJuridica;
    if (CNPJCPFFilial !== 0 || ehPessoaJuridica) {
      valorRetorno = this.formataCnpj(CNPJCPFBase, CNPJCPFFilial, DigCnpjCpf);
    } else {
      valorRetorno = this.formataCpf(CNPJCPFBase, DigCnpjCpf);
    }
    return valorRetorno;
  }

  public static formataCnpj(CNPJCPFBase: any, CNPJCPFFilial: any, DigCnpjCpf: any): string {
    CNPJCPFBase = CNPJCPFBase != null ? CNPJCPFBase : 0;
    CNPJCPFFilial = CNPJCPFFilial != null ? Number(CNPJCPFFilial) : 0;
    DigCnpjCpf = DigCnpjCpf != null ? DigCnpjCpf : 0;
    const adicionarBase = 8 - CNPJCPFBase.toString().length;
    const adicionarFilial = 4 - CNPJCPFFilial.toString().length;
    const adicionarDig = 2 - DigCnpjCpf.toString().length;
    for (let i = 0; i < adicionarBase; i++) {
      CNPJCPFBase = '0' + CNPJCPFBase;
    }
    for (let i = 0; i < adicionarFilial; i++) {
      CNPJCPFFilial = '0' + CNPJCPFFilial;
    }
    for (let i = 0; i < adicionarDig; i++) {
      DigCnpjCpf = '0' + DigCnpjCpf;
    }
    return this.pontuarCnpjCpf(CNPJCPFBase, CNPJCPFFilial, DigCnpjCpf, true);
  }

  public static formataCpf(CNPJCPFBase: any, DigCnpjCpf: any): string {
    CNPJCPFBase = CNPJCPFBase != null ? CNPJCPFBase : 0;
    DigCnpjCpf = DigCnpjCpf != null ? DigCnpjCpf : 0;
    const adicionarBase = 9 - CNPJCPFBase.toString().length;
    const adicionarDig = 2 - DigCnpjCpf.toString().length;
    for (let i = 0; i < adicionarBase; i++) {
      CNPJCPFBase = '0' + CNPJCPFBase;
    }
    for (let i = 0; i < adicionarDig; i++) {
      DigCnpjCpf = '0' + DigCnpjCpf;
    }
    return this.pontuarCnpjCpf(CNPJCPFBase, 0, DigCnpjCpf);
  }

  public static trimStart(character, palavra): string {
    let startIndex = 0;
    while (palavra[startIndex] === character) {
      startIndex++;
    }
    return palavra.substr(startIndex);
  }

  public static getJsonDate(dateJson: any): any {
    return Util.jsonDateToString(dateJson)
      .split('-')
      .join('/');
  }

  public static jsonDateToString(value: any): any {
    if (! this.isNullOrEmpty(value)) {
      const currentTime = new Date(parseInt(value.substr(6), 10));
      const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
      const day = ('0' + currentTime.getDate()).slice(-2);
      const year = currentTime.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  }

  public static jsonDateTimeToString(value: any): any {
    if (! this.isNullOrEmpty(value)) {
      const currentTime = new Date(parseInt(value.substr(6), 10));
      const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
      const day = ('0' + currentTime.getDate()).slice(-2);
      const year = currentTime.getFullYear();
      const hour = String('0' + (currentTime.getHours() - (currentTime.getTimezoneOffset() === 120 ? 1 : 0))).slice(-2);
      const minute = ('0' + currentTime.getMinutes()).slice(-2);
      const second = ('0' + currentTime.getSeconds()).slice(-2);
      return `${day}/${month}/${year} ${hour}':'${minute}':'${second}`;
    } else {
      return null;
    }
  }

  public static invertJsonDateToString(value: any): any {
    if (!this.isNullOrEmpty(value)) {
      const dateString = value.substr(6);
      const currentTime = new Date(parseInt(dateString, 10));
      const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
      const day = ('0' + currentTime.getDate()).slice(-2);
      const year = currentTime.getFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  }

  public static inverterToString(value: any): any {
    if (Util.isNullOrEmpty(value)) {
      return '';
    }
    value = value.replace('/', '-').replace('/', '-');
    let date = null;
    let dia = null;
    let mes = null;
    let ano = null;
    const dateString = value.split(' ');
    date = dateString[0].split('-');
    ano = date[2];
    mes = date[1];
    dia = date[0];
    return `${Util.completarStringComZero(ano, 4)}-${Util.completarStringComZero(mes, 2)}-${Util.completarStringComZero(dia, 2)}`;
  }

  static inverterDataToBackEnd(dtValor: string): string {
    if (this.isNullOrEmpty(dtValor)) {
      return '';
    }
    const splittedDate = dtValor.split(' ');
    let date = null;
    let dia = null;
    let mes = null;
    let ano = null;
    if (splittedDate[0].split('/').length === 3) {
      date = splittedDate[0].split('/');
      dia = Number(date[0]);
      mes = Number(date[1]);
      ano = Number(date[2]);
    } else {
      date = splittedDate[0].split('-');
      dia = Number(date[0]);
      mes = Number(date[1]);
      ano = Number(date[2]);
    }
    return `${Util.completarStringComZero(ano, 2)}-${Util.completarStringComZero(mes, 2)}-${Util.completarStringComZero(dia, 2)}`;
  }

  public static convertToNgbDatePicker(value: Date): any {
    const dateString = value.toString().substr(6);
    const currentTime = new Date(parseInt(dateString, 10));
    const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
    const day = ('0' + currentTime.getDate()).slice(-2);
    const year = currentTime.getFullYear();
    return { year: Number(year), month: Number(month), day: Number(day) };
  }

  public static OneDateValidator(data: any, minYear: number, maxYear: number): ValidationResult {
    let intData: number;
    let strData: string;
    if (! this.isNullOrEmpty(data.value)) {
      strData = data.value.toString().replace('/', '');
      intData = parseInt(strData, 10);

      if (intData < 1900 || intData > 2079) {
        return { OneDateValidator: true };
      }
    }
    return null;
  }
  public static isNullOrEmpty(str): boolean {
    if (str === '' || str == null || str === undefined) {
      return true;
    }
    return false;
  }

  private static formataComDDI(NumTel, NumDdd, NumDdi): string {
    if (NumTel.toString().trim().length === 9) {
      // Caso for celular
      return (
        `+${NumDdi.toString()} (${NumDdd.toString()}) ${NumTel.toString().slice(0, 5)}-${NumTel.toString().slice(5, 9)}`);
    } else if (NumTel.toString().trim().length < 4) {
      // Caso não seja maior que 4 digitos
      return `+${NumDdi.toString()} (${NumDdd.toString()}) ${NumTel.toString()}`;
    } else {
      // Caso for fax/telefone
      return (
        `+${NumDdi.toString()} (${NumDdd.toString()}) ${NumTel.toString().slice(0, 4)}-${NumTel.toString().slice(4, NumTel.toString().trim().length)}`);
    }
  }

  public static formataSemDDI(NumTel, NumDdd): string {
    if (NumTel.toString().trim().length === 9) {
      // Caso for celular
      return `(${NumDdd.toString()}) ${NumTel.toString().slice(0, 5)}-${NumTel.toString().slice(5, 9)}`;
    } else if (NumTel.toString().trim().length < 4) {
      // Caso não seja maior que 4 digitos
      return `(${NumDdd.toString()})${NumTel.toString()}`;
    } else {
      // Caso for fax/telefone
      return (
        `(${NumDdd.toString()}) ${NumTel.toString().slice(0, 4)}-${NumTel.toString().slice(4, NumTel.toString().trim().length)}`);
    }
  }

  public static formataSemDDD(NumTel): string {
    if (NumTel.toString().trim().length === 9) {
      // Caso for celular
      return `${NumTel.toString().slice(0, 5)}-${NumTel.toString().slice(5, 9)}`;
    } else if (NumTel.toString().trim().length < 4) {
      // Caso não seja maior que 4 digitos
      return NumTel.toString();
    } else {
      // Caso for fax/telefone
      return `${NumTel.toString().slice(0, 4)}-${NumTel.toString().slice(4, NumTel.toString().trim().length)}`;
    }
  }

  public static formataDdiDddNum(NumDdi: any, NumDdd: any, NumTel: any): string {
    if (NumTel.toString().trim() === '') {
      return '';
    }
    if (NumDdd.toString().trim() !== '') {
      const adicionarDdd = 3 - NumDdd.toString().length;
      for (let i = 0; i < adicionarDdd; i++) {
        NumDdd = '0' + NumDdd;
      }
      // Caso tenha DDI
      if (NumDdi.toString().trim() !== '') {
        NumTel = this.formataComDDI(NumTel, NumDdd, NumDdi);
      } else {
        NumTel = this.formataSemDDI(NumTel, NumDdd);
      }
    } else {
      NumTel = this.formataSemDDD(NumTel);
    }
    return NumTel;
  }

  public static calcularDigitoVerificadorCpfCnpj(numCnpjCpfBase): string {
    const digito1 = this.calcularPrimeiroDigitoCpfCnpj(numCnpjCpfBase);
    const digito2 = this.calcularSegundoDigitoCpfCnpj(numCnpjCpfBase, digito1);
    return `${digito1}${digito2}`;
  }

  public static calcularPrimeiroDigitoCpfCnpj(numCnpjCpfBase): number {
    let soma = 0;
    let resto = 0;
    const tempCpfCnpj: string = Util.completarStringComZero(numCnpjCpfBase, 9);

    for (let i = 0; i < tempCpfCnpj.length; i++) {
      soma += Number(tempCpfCnpj.substr(i, 1)) * (10 - i);
    }
    resto = 11 - (soma % 11);
    if (resto > 9) {
      resto = 0;
    }
    return resto;
  }

  public static calcularSegundoDigitoCpfCnpj(numCnpjCpfBase, digito): number {
    let soma = 0;
    let resto = 0;
    const tempCpfCnpj: string = Util.completarStringComZero(`${numCnpjCpfBase}${digito}`, 9);
    for (let i = 0; i < tempCpfCnpj.length; i++) {
      soma += Number(tempCpfCnpj.substr(i, 1)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto > 9) {
      resto = 0;
    }
    return resto;
  }

  public static obterDataAtualFormatada(divisao): string {
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();
    const yyyy = today.getFullYear();
    let hour = today.getHours().toString();
    let min = today.getMinutes().toString();
    let sec = today.getSeconds().toString();
    if (Number(dd) < 10) {
      dd = '0' + dd;
    }
    if (Number(mm) < 10) {
      mm = '0' + mm;
    }
    if (Number(hour) < 10) {
      hour = '0' + hour;
    }
    if (Number(min) < 10) {
      min = '0' + min;
    }
    if (Number(sec) < 10) {
      sec = '0' + sec;
    }
    return `${dd}${divisao}${mm}${divisao}${yyyy}${divisao}${hour}${divisao}${min}${divisao}${sec}`;
  }

  public static downloadArquivo(responseBlob: Blob, tipoRelatorio: TypeExportReport, nomeBaseArquivo: string): void {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    const fileName = nomeBaseArquivo;
    link.download = fileName;
    if (this.isIEBrowser) {
      window.navigator.msSaveOrOpenBlob(responseBlob, fileName);
    } else {
      link.href = window.URL.createObjectURL(responseBlob);
    }
    document.body.appendChild(link);
    link.click();
  }

  public static get isIEBrowser(): boolean {
    return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }

  private static obterExtensaoArquivo(tipoRelatorio: TypeExportReport): string {
    let valorRetorno: string;
    switch (tipoRelatorio) {
      case TypeExportReport.PDF:
        valorRetorno = '.pdf';
        break;
      case TypeExportReport.EXCEL:
        valorRetorno = '.xls';
        break;
      case TypeExportReport.TEXT:
        valorRetorno = '.txt';
        break;
    }
    return valorRetorno;
  }

  public static verificaSituacaoCompativel(entrada: any, comparativo: any[]): boolean {
    entrada = entrada.toString();
    if (!isNullOrUndefined(comparativo)) {
      comparativo.forEach(data => (data = data.toString()));
    }
    return comparativo.indexOf(entrada) > -1;
  }

  public static DeletaParametrosDiferentes(parametro: string, valor: any, lista: any): any {
    const contribuinte = [];
    if (!isNullOrUndefined(valor) && !isNullOrUndefined(lista) && !isNullOrUndefined(parametro)) {
      for (const iteme of valor) {
        for (const itemi of lista) {
          if (itemi[parametro] === iteme) {
            contribuinte.push(itemi);
          }
        }
      }
      return contribuinte;
    } else {
      return [];
    }
  }

  public static DeletaParametrosIguais(parametro: string, valor: any, lista: any): any {
    if (!isNullOrUndefined(valor) && !isNullOrUndefined(lista) && !isNullOrUndefined(parametro)) {
      for (let e = 0; e < valor.length; e++) {
        for (let i = 0; i < lista.length; i++) {
          if (lista[i][parametro] === valor[e]) {
            lista.splice(i, 1);
          }
        }
      }
    }
    return lista;
  }

  public static CompararAlteracoes(elements: any, alteracoes: string): void {

      for (const elemento in elements) {
        if (! Util.isNullOrEmpty(alteracoes) && alteracoes.indexOf(elemento) !== -1) {
          elements[elemento].Style = { color: 'orange' };
        } else {
          elements[elemento].Style = { color: 'black' };
        }
      }
  }
  // Verifica se o parâmetro passado é nulo ou indefinido, se for retorna string vazia.
  public static verificaInputNullUndefined(valor: any, retorno: any = ''): any {
    if (! this.isNullOrEmpty(valor)) {
      return valor;
    }
    return retorno;
  }

  public static obterTextoCombo(elements: HtmlElement): string {
    const combo = elements.Select;
    const valor = elements.Value;
    const item = combo.find(filtro => filtro.Value === valor);
    if (! Util.isNullOrEmpty(item)) {
       return item.Text;
    } else {
      return null;
    }
  }

  public static atualizarTotalCaracteres(parent, total: number): void {
    let qtdCampo =  0;

    if (total === 210) {
      qtdCampo = parent.elementsTransportador['DesInformacaoComplementar'].Value.length;
      parent.elementsTransportador['DesInformacaoComplementar'].Label = `Informações Complementares (${qtdCampo}/210 Caracteres)`;
    } else {
      qtdCampo = parent.elementsItemNotaFiscal['DesMercadoria'].Value.length;
      parent.elementsItemNotaFiscal['DesMercadoria'].Label = `Produto (${qtdCampo}/255 Caracteres)`;
    }
  }
}
