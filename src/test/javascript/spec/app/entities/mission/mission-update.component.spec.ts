import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SpaceTestModule } from '../../../test.module';
import { MissionUpdateComponent } from 'app/entities/mission/mission-update.component';
import { MissionService } from 'app/entities/mission/mission.service';
import { Mission } from 'app/shared/model/mission.model';

describe('Component Tests', () => {
  describe('Mission Management Update Component', () => {
    let comp: MissionUpdateComponent;
    let fixture: ComponentFixture<MissionUpdateComponent>;
    let service: MissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpaceTestModule],
        declarations: [MissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mission(123);
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
        const entity = new Mission();
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
