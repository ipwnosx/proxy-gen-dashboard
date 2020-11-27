import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyGenContainerComponent } from './containers/proxy-gen-container/proxy-gen-container.component';
import { ProxyTableComponent } from './containers/proxy-gen-container/components/proxy-table/proxy-table.component';
import { TopBarComponent } from './containers/proxy-gen-container/components/top-bar/top-bar.component';
import { SidebarComponent } from './containers/proxy-gen-container/components/sidebar/sidebar.component';
import { BwMeterComponent } from './containers/proxy-gen-container/components/bw-meter/bw-meter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BwStatComponent } from './containers/proxy-gen-container/components/bw-stat/bw-stat.component';
import { RrToRandomPipe } from './pipes/rr-to-random.pipe';
import { ModalModule } from '../modal/modal.module';
import { SimpleMessageComponent } from '../modal/components/simple-message/simple-message.component';


@NgModule({
  declarations: [
    ProxyGenContainerComponent, 
    ProxyTableComponent, 
    TopBarComponent, 
    SidebarComponent, 
    BwMeterComponent, 
    BwStatComponent, 
    RrToRandomPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule,
  ],
  exports: [
    ProxyGenContainerComponent
  ],
})
export class ProxyGenModule { }
