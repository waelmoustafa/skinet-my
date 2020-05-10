import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumb$: Observable<any[]>;
  constructor(private bsService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$ = this.bsService.breadcrumbs$;
  }

}
