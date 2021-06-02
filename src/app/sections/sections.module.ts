import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionsRoutes } from './sections.routing';

// COMPONENTES
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponents } from './sections.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        ReportsComponent
    ],
    providers: [],
})
export class SectionsModule { }
