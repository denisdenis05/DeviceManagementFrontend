import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, of, forkJoin } from 'rxjs';
import { takeUntil, catchError, map } from 'rxjs/operators';
import { AiService } from '../../../core/services/ai.service';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';
import { ApplicationConstants } from '../../../core/constants/application.constants';
import { ChatToggleService } from '../../../core/services/chat-toggle.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  deviceIds?: string[];
  devices?: Device[];
}

@Component({
  selector: 'app-mini-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mini-chat.component.html',
  styleUrl: './mini-chat.component.css'
})
export class MiniChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  public messages: ChatMessage[] = [];
  public userInput: string = '';
  public isOpen: boolean = false;
  public isLoading: boolean = false;
  public currentUserId: string = '';
  public applicationConstants = ApplicationConstants;

  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(
    private readonly aiService: AiService,
    private readonly deviceService: DeviceService,
    private readonly chatToggleService: ChatToggleService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.chatToggleService.isOpen$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(isOpen => this.isOpen = isOpen);

    const token = localStorage.getItem(ApplicationConstants.StorageKeys.AuthenticationToken);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserId = payload.nameid || payload.sub;
      } catch (err) {
        console.error('Failed to parse token for current user ID', err);
      }
    }

    this.messages.push({
      text: 'Hello! How can I help you with your devices today?',
      isUser: false
    });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public toggleChat(): void {
    this.chatToggleService.toggleChat();
  }

  public async sendMessage(): Promise<void> {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ text: userMessage, isUser: true });
    this.userInput = '';
    this.isLoading = true;

    this.aiService.chat(userMessage)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: async (res) => {
          const botMessageText = res.response;
          const deviceIds = this.extractDeviceIds(botMessageText);
          const cleanText = this.removeIdList(botMessageText);

          const botMessage: ChatMessage = {
            text: cleanText,
            isUser: false,
            deviceIds: deviceIds
          };

          if (deviceIds.length > 0) {
            this.loadDevices(deviceIds, botMessage);
          } else {
            this.messages.push(botMessage);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.messages.push({ text: 'Sorry, I encountered an error. Please try again.', isUser: false });
          this.isLoading = false;
        }
      });
  }

  private extractDeviceIds(text: string): string[] {
    const bracketRegex = /\[(['"`]?[a-f\d, '"\s`]+['"`]?)\]/gi;
    let match;
    const allIds: string[] = [];

    while ((match = bracketRegex.exec(text)) !== null) {
      const content = match[1];
      // Extract all probable IDs (hex strings of 24 chars, or anything inside backticks/quotes)
      const idMatches = content.match(/[`'"]?([a-f\d]{24})[`'"]?/gi);
      if (idMatches) {
        idMatches.forEach(id => {
          allIds.push(id.replace(/[`'"]/g, '').trim());
        });
      }
    }
    return [...new Set(allIds)];
  }

  private removeIdList(text: string): string {
    return text.replace(/\[(['"`]?[a-f\d, '"\s`]+['"`]?)\]/gi, '').trim();
  }

  private loadDevices(ids: string[], message: ChatMessage): void {
    const requests = ids.map(id => 
      this.deviceService.retrieveDeviceByIdentifier(id).pipe(
        catchError(() => of(null))
      )
    );

    forkJoin(requests).subscribe(devices => {
      message.devices = devices.filter(d => d !== null) as Device[];
      this.messages.push(message);
      this.isLoading = false;
    });
  }

  public assignDevice(id: string): void {
    this.deviceService.assignDevice(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.refreshDevice(id);
      });
  }

  public unassignDevice(id: string): void {
    this.deviceService.unassignDevice(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.refreshDevice(id);
      });
  }

  public deleteDevice(id: string): void {
    if (confirm('Are you sure you want to delete this device?')) {
      this.deviceService.deleteDevice(id)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(() => {
          this.messages.forEach(m => {
            if (m.devices) {
              m.devices = m.devices.filter(d => d.id !== id);
            }
          });
        });
    }
  }

  private refreshDevice(id: string): void {
    this.deviceService.retrieveDeviceByIdentifier(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(device => {
        this.messages.forEach(m => {
          if (m.devices) {
            const index = m.devices.findIndex(d => d.id === id);
            if (index !== -1) {
              m.devices[index] = device;
            }
          }
        });
      });
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
