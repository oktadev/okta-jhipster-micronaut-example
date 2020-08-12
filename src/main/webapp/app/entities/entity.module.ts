import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'space-event',
        loadChildren: () => import('./space-event/space-event.module').then(m => m.SpaceSpaceEventModule),
      },
      {
        path: 'mission',
        loadChildren: () => import('./mission/mission.module').then(m => m.SpaceMissionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SpaceEntityModule {}
