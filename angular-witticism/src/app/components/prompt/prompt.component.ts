import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {
  @Input() promptText: any;

  constructor() { }

  ngOnInit(): void {
  }

}
