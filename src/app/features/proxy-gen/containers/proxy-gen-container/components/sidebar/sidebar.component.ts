import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ProxyPackage } from 'src/app/features/proxy-gen/types/proxy-package';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { timeoutDefault } from '../bw-meter/timeoutDefault';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bwUsed$: Observable<number>;
  bwRemaining$: Observable<number>;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.bwUsed$ = this.store.selectedPackage$
      .pipe(        
        // If after a certain amout of time we don't receive a value that passes our filter,
        // send a default value
        timeoutDefault(4000, { bwUsed: 0, bwAllotted: 0 }, 
          (pkg: ProxyPackage) => pkg != undefined && pkg.bwUsed != undefined && pkg.bwAllotted != undefined),
        
          map((pkg: ProxyPackage) => Math.round(pkg.bwUsed * 1000))
      );

    this.bwRemaining$ = this.store.selectedPackage$
      .pipe(
        // If after a certain amout of time we don't receive a value that passes our filter,
        // send a default value
        timeoutDefault(4000, { bwUsed: 0, bwAllotted: 0 }, 
          (pkg: ProxyPackage) => pkg != undefined && pkg.bwUsed != undefined && pkg.bwAllotted != undefined),
          
        map((pkg: ProxyPackage) => Math.round((pkg.bwAllotted - pkg.bwUsed) * 1000))
      )
  }

}
