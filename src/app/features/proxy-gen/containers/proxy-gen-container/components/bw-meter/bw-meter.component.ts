import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import ProgressBar from 'progressbar.js';
import { StoreService } from 'src/app/core/services/store/store.service';
import { tap, takeUntil, distinctUntilChanged, filter, switchMap, timeout, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { ProxyPackage } from 'src/app/features/proxy-gen/types/proxy-package';
import { timeoutDefault } from './timeoutDefault';


@Component({
  selector: 'app-bw-meter',
  templateUrl: './bw-meter.component.html',
  styleUrls: ['./bw-meter.component.scss']
})
export class BwMeterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('progressCircle') circleElement: ElementRef;

  pnpCircle: ProgressBar.Circle;

  bandwidthUsed: number;
  bandwidthAllotted: number;

  ngUnsubscribe = new Subject();

  // can't animate circle while already animating or it throws an error
  animating: boolean = false;

  constructor(private store: StoreService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // initialize the progress circle
    this.pnpCircle = new ProgressBar.Circle(this.circleElement.nativeElement, {
      color: '#FCB03C',
      trailColor: '#545454',
      duration: 700,
      easing: 'easeInOut',
      strokeWidth: 2,
      trailWidth: 1,
    });

    // whenever the selected package is changed via the dropdown,
    // reanimate the circle
    this.store.selectedPackage$
      .pipe(
        distinctUntilChanged(),
        // If after a certain amout of time we don't receive a value that passes our filter,
        // send a default value
        timeoutDefault(4000, {bwUsed: 0, bwAllotted: 0}, 
          (pkg: ProxyPackage) => pkg != undefined && pkg.bwUsed != undefined && pkg.bwAllotted != undefined),
        
        tap((pkg: ProxyPackage) => {
          this.bandwidthUsed = this.toMb(pkg.bwUsed);
          this.bandwidthAllotted = this.toMb(pkg.bwAllotted);

          this.animateCircle();
        }),

        takeUntil(this.ngUnsubscribe)
      )
      .subscribe()

    // prevent view changed after checked error
    this.cd.detectChanges();
  }

  animateCircle() {
    // check if already animating so we don't throw an error
    if(this.animating) return;
    this.animating = true;
    this.pnpCircle.animate(this.bandwidthUsed / this.bandwidthAllotted, {}, () => this.animating = false);   
  }

  toMb(i: number) {
    return Math.round((i * 1000));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
