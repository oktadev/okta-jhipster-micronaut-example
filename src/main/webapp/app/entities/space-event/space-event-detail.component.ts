import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISpaceEvent } from 'app/shared/model/space-event.model';

@Component({
  selector: 'jhi-space-event-detail',
  templateUrl: './space-event-detail.component.html',
})
export class SpaceEventDetailComponent implements OnInit {
  spaceEvent: ISpaceEvent | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spaceEvent }) => (this.spaceEvent = spaceEvent));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
