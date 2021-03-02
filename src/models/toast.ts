export interface ToastState {
  toast: string;
}

export interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}
