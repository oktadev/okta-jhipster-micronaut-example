import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMission } from 'app/shared/model/mission.model';

@Component({
  selector: 'jhi-mission-detail',
  templateUrl: './mission-detail.component.html',
})
export class MissionDetailComponent implements OnInit {
  mission: IMission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mission }) => (this.mission = mission));
  }

  previousState(): void {
    window.history.back();
  }
}
