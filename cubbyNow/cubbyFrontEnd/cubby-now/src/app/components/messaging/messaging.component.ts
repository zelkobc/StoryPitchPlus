import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Message } from '../../models/message'
import { UrlService } from '../../services/url.service';
import { MessageService } from '../../services/message.service'

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
message: string;
target: number;
newMessage: Message;
Messages: Message[];
private hasFlag: number;
private authFlag: number;
@Input() public loggedUser: User;

  constructor(private messageService:MessageService) {
   }

  ngOnInit(): void {
    this.messageService.getMessages(this.loggedUser.id).subscribe(
      resp=> {
        this.Messages = resp;
      }
    )
    if(this.Messages.length == 0) {
      this.hasFlag = 0;
    } else {
      this.hasFlag = 1;
    }
    if(this.loggedUser.role.id > 1) {
      this.authFlag = 1;
    } else {
      this.authFlag = 0;
    }
  }
onSubmit() {
  this.newMessage = new Message;
  this.newMessage.content = this.message;
  this.newMessage.writer.id = this.loggedUser.id;
  this.newMessage.receiver.id = this.target;
  this.messageService.writeMessage(this.newMessage).subscribe();
}
}