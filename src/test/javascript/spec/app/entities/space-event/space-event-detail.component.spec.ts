import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SpaceTestModule } from '../../../test.module';
import { SpaceEventDetailComponent } from 'app/entities/space-event/space-event-detail.component';
import { SpaceEvent } from 'app/shared/model/space-event.model';

describe('Component Tests', () => {
  describe('SpaceEvent Management Detail Component', () => {
    let comp: SpaceEventDetailComponent;
    let fixture: ComponentFixture<SpaceEventDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ spaceEvent: new SpaceEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpaceTestModule],
        declarations: [SpaceEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SpaceEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpaceEventDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load spaceEvent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.spaceEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
