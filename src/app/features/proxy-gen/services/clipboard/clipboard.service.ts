import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { TableProxy } from '../../types/table-proxy';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private store: StoreService) { }

  copyProxiesToClipboard() {
    let proxies: TableProxy[] = [];

    this.store.tableProxies$
      .pipe(
        take(1)
      )
      .subscribe((p) => proxies = p);

    const formatted: string = proxies.reduce((acc, proxy: TableProxy) => acc + proxy.details + '\n', '');
    this.copy(formatted);
  }

  private copy(text: string) {

    //const text = this.proxies.reduce((acc, val) => acc + val[0] + '\n', '');
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = text;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    // @ts-ignore
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    
  }
}
