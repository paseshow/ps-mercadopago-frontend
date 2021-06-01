import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'sections-app',
    templateUrl: 'sections.component.html',
    styleUrls: ['sections.component.scss']
})

export class SectionsComponents implements OnInit {

    @ViewChild('headerToggle', { static: true }) headerToggle: ElementRef;
    @ViewChild('navbar', { static: true }) navbar: ElementRef;
    @ViewChild('header', { static: true }) header: ElementRef;
    @ViewChild('navLink', { static: false }) navLink: ElementRef;


    listItemsMenu = [
        {
            title: 'Configuracion',
            icon: 'bx-bar-chart-alt-2',
            router: 'configuracion'
        },
        {
            title: 'Búscar',
            icon: 'bx-search',
            router: 'reports'
        }
    ];

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    };

    openNavbar(): void {
        this.navbar.nativeElement.classList.toggle('show');
        this.headerToggle.nativeElement.classList.toggle('bx-x');
        this.header.nativeElement.classList.toggle('body-pd');
    };

    activeItemStyle(indexItemMenu): void {
        const linkColor = document.querySelectorAll('.nav_link')

        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'));
        }

        linkColor[indexItemMenu].classList.add('active');
    };

    definedIconItem(itemMenu): any {
        let icon = `${itemMenu.icon}`;
        return icon;
    };

    loginOut(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/authentication']);
    };

}