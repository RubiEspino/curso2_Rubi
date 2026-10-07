export interface Aviso {
  id: number;
  titulo: string;
  contenido: string;
  publicado: boolean;
  categoria?: { id: number; nombre: string };
  autor?: string;
  puede_borrar: boolean;
  creado: string;
}

export interface PaginaAvisos {
  avisos: Aviso[];
  actual: number;
  ultima: number;
  total: number;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface NuevoAviso {
  titulo: string;
  contenido: string;
  categoria_id: number | null;
}
