export declare abstract class WebSocketHandler {
  abstract onWSOpen(): void;
  abstract onWSClose(): void;
  abstract onWSMessageReceive(res): void;
}
