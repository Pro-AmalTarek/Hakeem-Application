import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HakeemAdvantagesComponent } from './hakeem-advantages.component';

describe('HakeemAdvantagesComponent', () => {
  let component: HakeemAdvantagesComponent;
  let fixture: ComponentFixture<HakeemAdvantagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HakeemAdvantagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HakeemAdvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
