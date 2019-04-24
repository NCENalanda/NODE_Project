import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  flag = false;
  returnUrl: string;

    constructor(
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }
  ngOnInit() {
    // get return url from route parameters or default to '/'
this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/' ;
  }



// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}



edit() {
  this.flag = true;
}
cancel() {
  this.userService.getById(this.currentUser.id)
          .subscribe(data => { this.currentUser = data; },
            error => { this.alertService.error = error; } );
  this.flag = false;
}
save() {
  console.log('currentUser :' + this.currentUser.firstName);
  this.userService.update(this.currentUser)
  .subscribe(data => {
             console.log('data : ' + data);
             this.currentUser =  data;
             this.router.navigate([this.returnUrl]); },
    error => {
      console.log('error : ' + error);
      this.alertService.error = error ; });
//  set flag
  this.flag = false;
}
}
