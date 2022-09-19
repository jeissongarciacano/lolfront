import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  @Input()
  res: any

  ngOnInit(): void {
    console.log(this.res)
  }



}
