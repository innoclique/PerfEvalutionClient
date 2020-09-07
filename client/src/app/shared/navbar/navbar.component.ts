import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private router: Router,
    private themeService: ThemeService,
    public translate: TranslateService) {
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en'); 
     }
     
  opened: boolean;
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  logOut(){    
    this.authService.LogOut()
     this.router.navigate(['login'])
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
