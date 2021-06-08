import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionsRoutes } from './sections.routing';

// COMPONENTES
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponents } from './sections.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RefundsComponent } from './refunds/refunds.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SectionsRoutes),
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        SectionsComponents,
        ConfigurationsComponent,
        ReportsComponent,
        RefundsComponent
    ],
    providers: [],
})
export class SectionsModule { }
