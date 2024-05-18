import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CancelComponent} from "../pages/stripe/cancel/cancel.component";
import {SuccessComponent} from "../pages/stripe/success/success.component";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {AboutComponent} from "../pages/about/about.component";
import {PricingComponent} from "../pages/pricing/pricing.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'cancel', component: CancelComponent},
  {path: 'about', component: AboutComponent},
  {path: 'pricing', component: PricingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
