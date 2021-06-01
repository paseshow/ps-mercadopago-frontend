import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthRoutes } from './auth.routing';

import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class AuthenticationModule { }
