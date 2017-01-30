import { Injectable }                           from "@angular/core";
import {Subject, Subscription, Observable}    from 'rxjs/Rx';
import { WebSocketSubject }                     from "rxjs/observable/dom/WebSocketSubject";
import {environment} from "../../environments/environment";

@Injectable()
export class WebSocketService {

    private ws: WebSocketSubject<Object>;
    private socket: Subscription;
    private url: string;

    public message: Subject<Object> = new Subject();
    public opened: Subject<boolean> = new Subject<boolean>();

    public close():void{
        this.socket.unsubscribe();
        this.ws.complete();
    }

    public sendMessage( message:string ):void{
        this.ws.next( message );
    }

    public start():void{
        let self = this;

        this.url = environment.service.api;

        this.ws = new WebSocketSubject( this.url );

        this.socket = this.ws.subscribe( {

            next: ( data:MessageEvent ) => {
                if( data[ 'type' ] == 'welcome' ){
                    self.opened.next( true );
                }
                this.message.next( data );
            },
            error: () => {

                self.opened.next( false );
                this.message.next( { type: 'closed' } );

                self.socket.unsubscribe();

                setTimeout( () => {
                    self.start();
                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
            }

        } );

    }

}