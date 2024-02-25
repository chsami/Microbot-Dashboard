import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotCardComponent } from './bot-card.component';

describe('BotCardComponent', () => {
  let component: BotCardComponent;
  let fixture: ComponentFixture<BotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
