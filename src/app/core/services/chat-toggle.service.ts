import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatToggleService {
  private readonly isOpenSubject = new BehaviorSubject<boolean>(false);
  public readonly isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  public openChat(): void {
    this.isOpenSubject.next(true);
  }

  public closeChat(): void {
    this.isOpenSubject.next(false);
  }

  public toggleChat(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}
