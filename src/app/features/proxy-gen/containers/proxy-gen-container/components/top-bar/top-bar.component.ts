import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClipboardService } from 'src/app/features/proxy-gen/services/clipboard/clipboard.service';
import { RegionService } from 'src/app/features/proxy-gen/services/countries/region.service';
import { Observable, Subject } from 'rxjs';
import { ProxyPackage } from 'src/app/features/proxy-gen/types/proxy-package';
import { StoreService } from 'src/app/core/services/store/store.service';
import { longname } from 'src/app/features/proxy-gen/types/region';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormSelectUpdater } from './formSelectUpdater';
import { ProxyGenerationService } from 'src/app/features/proxy-gen/services/gen-proxies/proxy-generation.service';
import { takeUntil, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  regionLongnames$: Observable<longname[]>;
  packages$: Observable<ProxyPackage[]>;

  formGroup: FormGroup;

  ngUnsubscribe = new Subject();

  constructor(private clipboardService: ClipboardService,
              private regionService: RegionService,
              private store: StoreService,
              private fb: FormBuilder,
              private gen: ProxyGenerationService) { }

  ngOnInit(): void {
    // the regions service uses the store to get regions from 
    // currently selected package. just fyi.
    this.regionLongnames$ = this.regionService.regionLongnames$;//.pipe(tap((v)=> console.log('countries in countries obs: ', v)));

    this.packages$ = this.store.packages$;

    this.formGroup = this.fb.group({
      package: [],
      regionLongname: [],
      type: ['static'],
      quantity: [10],
    });
    
    // Keeps form select boxes in sync when using the async pipe and an immutable data store
    const fsu = new FormSelectUpdater(this.formGroup, this.ngUnsubscribe);
    fsu.add<ProxyPackage>('package', this.packages$);
    fsu.add<longname>('regionLongname', this.regionLongnames$);

    // set selected package in store when it changes
    this.formGroup.get('package').valueChanges
      .pipe(
        distinctUntilChanged((a: ProxyPackage, b: ProxyPackage) => a.id === b.id),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((p: ProxyPackage) => {
        this.store.setSelectedPackage(p);
        this.store.setTableProxies([]);
      });
  }

  genProxies() {
    this.gen.genProxiesFromFormValue(this.formGroup.value);
  }

  copyToClipboard() {
    this.clipboardService.copyProxiesToClipboard();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
