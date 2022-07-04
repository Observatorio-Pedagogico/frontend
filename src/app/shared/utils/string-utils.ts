import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtils {
    truncate(_text: string, _tamanho: number): string {
        if (_text.length >= _tamanho) {
            return _text.slice(0, _tamanho).concat("...");
        }
        return _text;
    }
}
