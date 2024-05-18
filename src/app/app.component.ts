import {Component} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {UserService} from "../shared/user.service";
import {Observable, of} from "rxjs";
import {DiscordUser} from "./models/DiscordUser";
import {AppService} from "./app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../shared/loading.service";
import {finalize} from "rxjs/operators";
import {KeyService} from "../shared/key.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuitems: MenuItem[]
  LOCAL_STORAGE_KEY = "microbot-id"
  loading$ = this.loadingService.loading$;
  public user$: Observable<DiscordUser | null>;
  loading = false

  constructor(private userService: UserService, protected router: Router, private loadingService: LoadingService, private appService: AppService, private activatedRoute: ActivatedRoute, private keysService: KeyService) {
    this.menuitems = [{
      label: 'Home',
      icon: 'pi pi-home',
      command(event: MenuItemCommandEvent) {
        router.navigate(['/']);
      },
    },
      {
        label: 'Pricing',
        icon: 'pi pi-dollar',
        command(event: MenuItemCommandEvent) {
          router.navigate(['/pricing']);
        },
      }, {
        label: 'About',
        icon: 'pi pi-info-circle',
        command(event: MenuItemCommandEvent) {
          router.navigate(['/about']);
        }
      }]
    this.user$ = userService.user$;
  }

  ngOnInit(): void {
    this.loading = true
    // Subscribe to query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      this.userService.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string
      if (code) {
        this.appService.fetchAccessToken(code)
          .pipe(finalize(() => this.loading = false))
          .subscribe((result) => {
            this.userService.token = result
            localStorage.setItem(this.LOCAL_STORAGE_KEY, result)
            this.router.navigate(['/'])
          })
      } else {
        if (this.userService.token) {
          this.keysService.getKeys()
          this.userService.fetchUserInfo()
        }
        this.loading = false
      }
    });
  }

  logout() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY)
    this.userService.resetUser()
  }

}
