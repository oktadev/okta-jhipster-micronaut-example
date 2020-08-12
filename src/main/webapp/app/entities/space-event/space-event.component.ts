import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpaceEvent } from 'app/shared/model/space-event.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SpaceEventService } from './space-event.service';
import { SpaceEventDeleteDialogComponent } from './space-event-delete-dialog.component';

@Component({
  selector: 'jhi-space-event',
  templateUrl: './space-event.component.html',
})
export class SpaceEventComponent implements OnInit, OnDestroy {
  spaceEvents: ISpaceEvent[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected spaceEventService: SpaceEventService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.spaceEvents = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.spaceEventService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISpaceEvent[]>) => this.paginateSpaceEvents(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.spaceEvents = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpaceEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpaceEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSpaceEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe('spaceEventListModification', () => this.reset());
  }

  delete(spaceEvent: ISpaceEvent): void {
    const modalRef = this.modalService.open(SpaceEventDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.spaceEvent = spaceEvent;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSpaceEvents(data: ISpaceEvent[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.spaceEvents.push(data[i]);
      }
    }
  }
}
