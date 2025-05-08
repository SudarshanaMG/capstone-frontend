import { Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { EstimateComponent } from './components/estimations/estimations.component';
import { NewEstimationInputsComponent } from './components/new-estimation-inputs/new-estimation-inputs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route, redirects to card
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'inputs', component: InputsComponent },
    { path: 'estimations', component: EstimateComponent },
    { path: 'estimate/:inputId', component: EstimateComponent },
    { path: 'add-input', component: NewEstimationInputsComponent},
    { path: '**', redirectTo: 'login' },
];
