import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMission } from 'app/shared/model/mission.model';
import { MissionService } from './mission.service';

@Component({
  templateUrl: './mission-delete-dialog.component.html',
})
export class MissionDeleteDialogComponent {
  mission?: IMission;

  constructor(protected missionService: MissionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.missionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('missionListModification');
      this.activeModal.close();
    });
  }
}
