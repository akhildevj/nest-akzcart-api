import { Type } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface DatabaseInterface<T> {
  rawQuery(query: string, params: Array<any>, type: Type<T>): Observable<T[]>;
}
