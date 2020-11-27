import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proxyGenDashboard';

  // inject services here so they get initialized here
  constructor(private authService: AuthService,
              private store: StoreService) {}
}
