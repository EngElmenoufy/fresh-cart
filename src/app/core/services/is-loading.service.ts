import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsLoadingService {
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  loadingFor: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
}
