import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css']
})
export class HabilityComponent implements OnInit {
  @Input()
  champion: any;

  constructor() { }

  ngOnInit(): void {
    $(".step").click(function () {
      $(this).addClass("active").prevAll().addClass("active");
      $(this).nextAll().removeClass("active");
    });

    $(".p").click(function () {
      $(".passive").addClass("active").siblings().removeClass("active");
    });

    $(".q").click(function () {
      $(".habilityQ").addClass("active").siblings().removeClass("active");
    });

    $(".w").click(function () {
      $(".habilityW").addClass("active").siblings().removeClass("active");
    });

    $(".e").click(function () {
      $(".habilityE").addClass("active").siblings().removeClass("active");
    });

    $(".r").click(function () {
      $(".habilityR").addClass("active").siblings().removeClass("active");
    });
    
  }



}





