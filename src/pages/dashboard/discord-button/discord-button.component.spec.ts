import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordButtonComponent } from './discord-button.component';

describe('DiscordButtonComponent', () => {
  let component: DiscordButtonComponent;
  let fixture: ComponentFixture<DiscordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscordButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
