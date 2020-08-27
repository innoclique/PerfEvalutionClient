import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer', { static: false }) 
  drawer: MatSidenav;
  isDarkTheme: Observable<boolean>;
  constructor(public authService: AuthService,
    private themeService: ThemeService) { }
  opened: boolean;
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
