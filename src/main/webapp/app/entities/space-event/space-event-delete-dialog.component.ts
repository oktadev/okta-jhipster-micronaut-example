import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpaceEvent } from 'app/shared/model/space-event.model';
import { SpaceEventService } from './space-event.service';

@Component({
  templateUrl: './space-event-delete-dialog.component.html',
})
export class SpaceEventDeleteDialogComponent {
  spaceEvent?: ISpaceEvent;

  constructor(
    protected spaceEventService: SpaceEventService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.spaceEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('spaceEventListModification');
      this.activeModal.close();
    });
  }
}
