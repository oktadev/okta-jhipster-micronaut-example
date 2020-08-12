import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpaceEvent, SpaceEvent } from 'app/shared/model/space-event.model';
import { SpaceEventService } from './space-event.service';
import { SpaceEventComponent } from './space-event.component';
import { SpaceEventDetailComponent } from './space-event-detail.component';
import { SpaceEventUpdateComponent } from './space-event-update.component';

@Injectable({ providedIn: 'root' })
export class SpaceEventResolve implements Resolve<ISpaceEvent> {
  constructor(private service: SpaceEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpaceEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((spaceEvent: HttpResponse<SpaceEvent>) => {
          if (spaceEvent.body) {
            return of(spaceEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SpaceEvent());
  }
}

export const spaceEventRoute: Routes = [
  {
    path: '',
    component: SpaceEventComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.spaceEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SpaceEventDetailComponent,
    resolve: {
      spaceEvent: SpaceEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.spaceEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpaceEventUpdateComponent,
    resolve: {
      spaceEvent: SpaceEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.spaceEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpaceEventUpdateComponent,
    resolve: {
      spaceEvent: SpaceEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.spaceEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
