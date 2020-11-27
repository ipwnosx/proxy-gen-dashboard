import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { TableProxy } from 'src/app/features/proxy-gen/types/table-proxy';
import { DataSource } from './dataSource';
import { ProxyGenerationService } from 'src/app/features/proxy-gen/services/gen-proxies/proxy-generation.service';


@Component({
  selector: 'app-proxy-table',
  templateUrl: './proxy-table.component.html',
  styleUrls: ['./proxy-table.component.scss']
})
export class ProxyTableComponent implements OnInit {

  dataSource: DataSource<TableProxy>;

  constructor(private store: StoreService, private gen: ProxyGenerationService) { }

  ngOnInit(): void {
    // const p = this.gen.genProxies(100, 100, true, 'US');
    // this.store.setTableProxies(p);

    this.dataSource = new DataSource(this.store.tableProxies$);
  }

}
