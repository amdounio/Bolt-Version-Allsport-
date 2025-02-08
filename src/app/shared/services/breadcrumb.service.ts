import {Injectable} from '@angular/core';
import {BehaviorSubject, filter} from "rxjs";
import {Breadcrumb} from "../../core/models/breadcrumb .model";
import {ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          title: this.getTitle(route.data),
          url: '/' + routeUrl.join('/'),
          current: this.isUrlActive('/' + routeUrl.join('/'))
        };
        if (breadcrumbs.filter(value => value.label === breadcrumb.label).length === 0) {
          breadcrumbs.push(breadcrumb);
        }
      }
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }

  private getTitle(data: Data) {
    return typeof data['title'] === 'function' ? data['title'](data) : data['title'];
  }

  private isUrlActive(url: string): boolean {
    return this.router.isActive(url, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

}
