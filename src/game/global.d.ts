interface Document {
  webkitFullscreenEnabled: boolean;
  readonly webkitFullscreenElement: Element | null;
}

interface HTMLElement {
  webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
}

declare var document: Document;