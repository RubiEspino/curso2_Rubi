import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { Aviso, Categoria, NuevoAviso, PaginaAvisos } from '../modelos/aviso';
import { SIN_TOKEN } from '../interceptores/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private cambiosSubject = new Subject<void>();
  readonly cambios$ = this.cambiosSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar(): Observable<Aviso[]> {
    return this.http.get<{ data: Aviso[] }>('/api/avisos', {
      context: new HttpContext().set(SIN_TOKEN, true)
    }).pipe(
      map(respuesta => respuesta.data)
    );
  }

  pagina(numero: number): Observable<PaginaAvisos> {
    return this.http.get<{ data: Aviso[]; meta: { current_page: number; last_page: number; total: number } }>(`/api/avisos?page=${numero}`, {
      context: new HttpContext().set(SIN_TOKEN, true)
    }).pipe(
      map(respuesta => ({
        avisos: respuesta.data,
        actual: respuesta.meta.current_page,
        ultima: respuesta.meta.last_page,
        total: respuesta.meta.total
      }))
    );
  }

  uno(id: number): Observable<Aviso> {
    return this.http.get<{ data: Aviso }>(`/api/avisos/${id}`, {
      context: new HttpContext().set(SIN_TOKEN, true)
    }).pipe(
      map(respuesta => respuesta.data)
    );
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('/api/categorias', {
      context: new HttpContext().set(SIN_TOKEN, true)
    });
  }

  crear(aviso: NuevoAviso): Observable<Aviso> {
    return this.http.post<{ data: Aviso }>('/api/avisos', aviso).pipe(
      map(respuesta => respuesta.data)
    );
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`/api/avisos/${id}`);
  }

  actualizar(id: number, aviso: NuevoAviso): Observable<Aviso> {
    return this.http.put<{ data: Aviso }>(`/api/avisos/${id}`, aviso).pipe(
      map(respuesta => respuesta.data),
      tap(() => this.cambiosSubject.next())
    );
  }

}
