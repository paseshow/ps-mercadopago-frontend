import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionsRoutes } from './sections.routing';

// COMPONENTES
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponents } from './sections.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SectionsRoutes)
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
