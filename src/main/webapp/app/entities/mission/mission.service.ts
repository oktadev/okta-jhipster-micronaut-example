import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMission } from 'app/shared/model/mission.model';

type EntityResponseType = HttpResponse<IMission>;
type EntityArrayResponseType = HttpResponse<IMission[]>;

@Injectable({ providedIn: 'root' })
export class MissionService {
  public resourceUrl = SERVER_API_URL + 'api/missions';

  constructor(protected http: HttpClient) {}

  create(mission: IMission): Observable<EntityResponseType> {
    return this.http.post<IMission>(this.resourceUrl, mission, { observe: 'response' });
  }

  update(mission: IMission): Observable<EntityResponseType> {
    return this.http.put<IMission>(this.resourceUrl, mission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
