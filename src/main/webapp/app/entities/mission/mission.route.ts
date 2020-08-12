import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMission, Mission } from 'app/shared/model/mission.model';
import { MissionService } from './mission.service';
import { MissionComponent } from './mission.component';
import { MissionDetailComponent } from './mission-detail.component';
import { MissionUpdateComponent } from './mission-update.component';

@Injectable({ providedIn: 'root' })
export class MissionResolve implements Resolve<IMission> {
  constructor(private service: MissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((mission: HttpResponse<Mission>) => {
          if (mission.body) {
            return of(mission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Mission());
  }
}

export const missionRoute: Routes = [
  {
    path: '',
    component: MissionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'spaceApp.mission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MissionDetailComponent,
    resolve: {
      mission: MissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.mission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MissionUpdateComponent,
    resolve: {
      mission: MissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.mission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MissionUpdateComponent,
    resolve: {
      mission: MissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'spaceApp.mission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
