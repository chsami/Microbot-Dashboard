import {Component} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {UserService} from "../shared/user.service";
import {Observable, skip} from "rxjs";
import {DiscordUser} from "./models/DiscordUser";
import {AppService} from "./app.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LoadingService} from "../shared/loading.service";
import {KeyService} from "../shared/key.service";
import {finalize} from "rxjs/operators";

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
  loading = true

  constructor(private userService: UserService, protected router: Router, private loadingService: LoadingService, private appService: AppService, private route: ActivatedRoute, private keysService: KeyService) {
    console.log(this.route.snapshot); // Access your query params here
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
    // Subscribe to query parameters
    // have to do this dirty fix, because initial load in app.component does not include query params
    if (window.location.href.includes('code')) {
      this.route.queryParamMap
        .pipe(skip(1))
        .subscribe((queryParams: ParamMap) => {
          this.loading = true
          const code = queryParams.get('code')
          this.userService.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string
          if (code) {
            this.appService.fetchAccessToken(code)
              .pipe(finalize(() => this.loading = false))
              .subscribe((result) => {
                this.userService.token = result
                localStorage.setItem(this.LOCAL_STORAGE_KEY, result)
                this.router.navigate(['/'])
              })
          }
        })
    } else {
      this.userService.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string
      if (this.userService.token) {
        this.keysService.getKeys()
        this.userService.fetchUserInfo()
      }
      this.loading = false
    }
  }

  logout() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY)
    this.userService.resetUser()
  }

}
