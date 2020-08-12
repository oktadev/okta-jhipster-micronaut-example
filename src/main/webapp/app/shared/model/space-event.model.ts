import { Moment } from 'moment';
import { IMission } from 'app/shared/model/mission.model';
import { SpaceEventType } from 'app/shared/model/enumerations/space-event-type.model';

export interface ISpaceEvent {
  id?: number;
  name?: string;
  date?: Moment;
  description?: any;
  photoContentType?: string;
  photo?: any;
  type?: SpaceEventType;
  mission?: IMission;
}

export class SpaceEvent implements ISpaceEvent {
  constructor(
    public id?: number,
    public name?: string,
    public date?: Moment,
    public description?: any,
    public photoContentType?: string,
    public photo?: any,
    public type?: SpaceEventType,
    public mission?: IMission
  ) {}
}
