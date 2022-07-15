import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthRoutes } from './auth.routing';

import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { LoadingModule } from '../../components/loading/loading.module';
import { AppModule } from '../../app.module';
// import { LoadingComponent } from 'src/app/components/loading/loading.component';

@NgModule({
    imports: [
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule,
        LoadingModule
    ],
    exports: [
        
    ],
    declarations: [
        AuthComponent,
    ],
    providers: [],
})
export class AuthenticationModule { }
