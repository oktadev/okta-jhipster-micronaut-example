import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISpaceEvent, SpaceEvent } from 'app/shared/model/space-event.model';
import { SpaceEventService } from './space-event.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IMission } from 'app/shared/model/mission.model';
import { MissionService } from 'app/entities/mission/mission.service';

@Component({
  selector: 'jhi-space-event-update',
  templateUrl: './space-event-update.component.html',
})
export class SpaceEventUpdateComponent implements OnInit {
  isSaving = false;
  missions: IMission[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    photo: [null, [Validators.required]],
    photoContentType: [],
    type: [null, [Validators.required]],
    mission: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected spaceEventService: SpaceEventService,
    protected missionService: MissionService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spaceEvent }) => {
      this.updateForm(spaceEvent);

      this.missionService
        .query({ filter: 'spaceevent-is-null' })
        .pipe(
          map((res: HttpResponse<IMission[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMission[]) => {
          if (!spaceEvent.mission || !spaceEvent.mission.id) {
            this.missions = resBody;
          } else {
            this.missionService
              .find(spaceEvent.mission.id)
              .pipe(
                map((subRes: HttpResponse<IMission>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMission[]) => (this.missions = concatRes));
          }
        });
    });
  }

  updateForm(spaceEvent: ISpaceEvent): void {
    this.editForm.patchValue({
      id: spaceEvent.id,
      name: spaceEvent.name,
      date: spaceEvent.date,
      description: spaceEvent.description,
      photo: spaceEvent.photo,
      photoContentType: spaceEvent.photoContentType,
      type: spaceEvent.type,
      mission: spaceEvent.mission,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('spaceApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const spaceEvent = this.createFromForm();
    if (spaceEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.spaceEventService.update(spaceEvent));
    } else {
      this.subscribeToSaveResponse(this.spaceEventService.create(spaceEvent));
    }
  }

  private createFromForm(): ISpaceEvent {
    return {
      ...new SpaceEvent(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      date: this.editForm.get(['date'])!.value,
      description: this.editForm.get(['description'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      type: this.editForm.get(['type'])!.value,
      mission: this.editForm.get(['mission'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpaceEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IMission): any {
    return item.id;
  }
}
