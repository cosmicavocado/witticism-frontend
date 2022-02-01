import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.answers').click(function(e:any) {
      if($(e.target).hasClass('ans') && !$(e.target).hasClass('border border-2 border-primary')) {
        $(e.target).parent().children().removeClass('border border-2 border-primary');
        $(e.target).addClass('border border-2 border-primary');
      }
  });
  }

}
