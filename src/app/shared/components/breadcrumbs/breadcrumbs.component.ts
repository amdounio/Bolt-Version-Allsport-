import {Component, inject, OnInit} from '@angular/core';
import {Breadcrumb} from "../../../core/models/breadcrumb .model";
import {Observable} from "rxjs";
import {BreadcrumbService} from "../../services/breadcrumb.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs$: Observable<Breadcrumb[]> = inject(BreadcrumbService).breadcrumbs$;

  title: string | undefined = 'Dashboard';

  ngOnInit(): void {
    this.breadcrumbs$.subscribe(breadcrumbs => {
      for (let breadcrumb of breadcrumbs) {
        this.title = 'Dashboard';
        if (breadcrumb.current) {
          this.title = breadcrumb.title;
        }
      }
    })
  }

}
