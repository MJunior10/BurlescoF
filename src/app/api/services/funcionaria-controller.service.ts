/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FuncionariaDto } from '../models/funcionaria-dto';
import { FuncionariaDadosAlteravelDto } from '../models/funcionaria-dados-alteravel-dto';
import { FuncionariaListaDto } from '../models/funcionaria-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class FuncionariaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorId
   */
  static readonly ObterPorIdPath = '/api/v1/funcionaria/{id}';

  /**
   * Obter os dados completos de uma funcionaria pelo ID informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.ObterPorIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma funcionaria pelo ID informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.obterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation alterar
   */
  static readonly AlterarPath = '/api/v1/funcionaria/{id}';

  /**
   * Metodo utilizado para alterar dados de uma Funcionaria
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar$Response(params: {
    id: number;
    body: FuncionariaDadosAlteravelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.AlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Metodo utilizado para alterar dados de uma Funcionaria
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar(params: {
    id: number;
    body: FuncionariaDadosAlteravelDto
  },
  context?: HttpContext

): Observable<any> {

    return this.alterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation remover
   */
  static readonly RemoverPath = '/api/v1/funcionaria/{id}';

  /**
   * Método utililzado para remover uma funcionaria pelo ID informada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.RemoverPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utililzado para remover uma funcionaria pelo ID informada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.remover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation listAll
   */
  static readonly ListAllPath = '/api/v1/funcionaria';

  /**
   * Listagem geral de Funcionarias
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FuncionariaListaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.ListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FuncionariaListaDto>>;
      })
    );
  }

  /**
   * Listagem geral de Funcionarias
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll(params?: {
  },
  context?: HttpContext

): Observable<Array<FuncionariaListaDto>> {

    return this.listAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FuncionariaListaDto>>) => r.body as Array<FuncionariaListaDto>)
    );
  }

  /**
   * Path part for operation incluir
   */
  static readonly IncluirPath = '/api/v1/funcionaria';

  /**
   * Metodo utilizado para realizar a inclusão de uma Funcionaria
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir$Response(params: {
    body: FuncionariaDadosAlteravelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FuncionariaDto>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.IncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FuncionariaDto>;
      })
    );
  }

  /**
   * Metodo utilizado para realizar a inclusão de uma Funcionaria
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir(params: {
    body: FuncionariaDadosAlteravelDto
  },
  context?: HttpContext

): Observable<FuncionariaDto> {

    return this.incluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<FuncionariaDto>) => r.body as FuncionariaDto)
    );
  }

  /**
   * Path part for operation pesquisar
   */
  static readonly PesquisarPath = '/api/v1/funcionaria/pesquisar';

  /**
   * Busca funcionaria pelos dados informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pesquisar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pesquisar$Response(params: {
    body: FuncionariaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FuncionariaListaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FuncionariaControllerService.PesquisarPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FuncionariaListaDto>>;
      })
    );
  }

  /**
   * Busca funcionaria pelos dados informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pesquisar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pesquisar(params: {
    body: FuncionariaDto
  },
  context?: HttpContext

): Observable<Array<FuncionariaListaDto>> {

    return this.pesquisar$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FuncionariaListaDto>>) => r.body as Array<FuncionariaListaDto>)
    );
  }

}
