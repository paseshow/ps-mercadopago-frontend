import { Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { RefundsComponent } from './refunds/refunds.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponents } from './sections.component';

export const SectionsRoutes: Routes = [
    {
        path: '',
        component: SectionsComponents,
        children: [
            {
                path: 'configuracion',
                component: ConfigurationsComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
            {
                path: 'refunds',
                component: RefundsComponent
            }
        ]
    },

]