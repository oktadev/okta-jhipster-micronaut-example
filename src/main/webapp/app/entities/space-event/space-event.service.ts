import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpaceEvent } from 'app/shared/model/space-event.model';

type EntityResponseType = HttpResponse<ISpaceEvent>;
type EntityArrayResponseType = HttpResponse<ISpaceEvent[]>;

@Injectable({ providedIn: 'root' })
export class SpaceEventService {
  public resourceUrl = SERVER_API_URL + 'api/space-events';

  constructor(protected http: HttpClient) {}

  create(spaceEvent: ISpaceEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spaceEvent);
    return this.http
      .post<ISpaceEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(spaceEvent: ISpaceEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spaceEvent);
    return this.http
      .put<ISpaceEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISpaceEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpaceEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(spaceEvent: ISpaceEvent): ISpaceEvent {
    const copy: ISpaceEvent = Object.assign({}, spaceEvent, {
      date: spaceEvent.date && spaceEvent.date.isValid() ? spaceEvent.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((spaceEvent: ISpaceEvent) => {
        spaceEvent.date = spaceEvent.date ? moment(spaceEvent.date) : undefined;
      });
    }
    return res;
  }
}
