import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {Subscription, switchMap} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {StripeFactoryService, StripeInstance} from "ngx-stripe";
import {UserService} from "../../shared/user.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  public stripe!: StripeInstance;
  public stripeAmount!: number;
  public stripePublicKey = 'pk_test_51PHBkLJ45WMcMRTuCV9KWnVpC1jbwWG9i00ZSGycmoaH3CFfF87iJqSKZRuK85Kgw7UdQd6sT0w8P7Yv3jbJb1bJ00A0dcyeyi';
  private subscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private stripeFactory: StripeFactoryService,
    private userService: UserService
  ) {
    this.stripe = this.stripeFactory.create(this.stripePublicKey);
    this.subscriptions = new Subscription();
  }

  async checkout() {
    const host = environment.baseUrl;
    const user = this.userService.getUser()
    console.log(user?.id)
    const checkout: Subscription = this.http.post(host + '/create-checkout-session', {userId: user?.id}, {observe: 'response'})
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        if (result.error) {
          console.log(result.error)
        }
      });
    this.subscriptions.add(checkout);
  }
}

interface IStripeSession {
  id: string;
}
