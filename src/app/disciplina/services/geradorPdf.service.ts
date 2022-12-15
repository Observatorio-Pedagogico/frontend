import { PdfArquivoRequest } from './../../shared/interfaces/arquivo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../authenticacao/login.service';
import { PdfArquivoResponse } from '../../shared/interfaces/arquivo';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from 'src/environments/environment';
import { ResponseBody } from '../../shared/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class GeradorPdfService {

  private readonly GERADOR_PDF = '/gerador_pdf';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  gerarPdf(pdfArquivoRequest: PdfArquivoRequest): Observable<ResponseBody<PdfArquivoResponse>> {
    return this.httpClient.post<ResponseBody<PdfArquivoResponse>>(URL_BASE.concat(this.GERADOR_PDF), pdfArquivoRequest, {headers: this.loginService.criarHeaderAuth()});
  }
}
