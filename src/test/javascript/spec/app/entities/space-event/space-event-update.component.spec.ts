import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SpaceTestModule } from '../../../test.module';
import { SpaceEventUpdateComponent } from 'app/entities/space-event/space-event-update.component';
import { SpaceEventService } from 'app/entities/space-event/space-event.service';
import { SpaceEvent } from 'app/shared/model/space-event.model';

describe('Component Tests', () => {
  describe('SpaceEvent Management Update Component', () => {
    let comp: SpaceEventUpdateComponent;
    let fixture: ComponentFixture<SpaceEventUpdateComponent>;
    let service: SpaceEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpaceTestModule],
        declarations: [SpaceEventUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SpaceEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpaceEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpaceEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SpaceEvent(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SpaceEvent();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
