import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceSharedModule } from 'app/shared/shared.module';
import { SpaceEventComponent } from './space-event.component';
import { SpaceEventDetailComponent } from './space-event-detail.component';
import { SpaceEventUpdateComponent } from './space-event-update.component';
import { SpaceEventDeleteDialogComponent } from './space-event-delete-dialog.component';
import { spaceEventRoute } from './space-event.route';

@NgModule({
  imports: [SpaceSharedModule, RouterModule.forChild(spaceEventRoute)],
  declarations: [SpaceEventComponent, SpaceEventDetailComponent, SpaceEventUpdateComponent, SpaceEventDeleteDialogComponent],
  entryComponents: [SpaceEventDeleteDialogComponent],
})
export class SpaceSpaceEventModule {}
