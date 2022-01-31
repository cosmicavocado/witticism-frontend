import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {
  promptText: string = '';
  constructor() { }

  ngOnInit(): void {
    this.promptText = 'This is a sample prompt. Lorem ipsum dolor sit amet dolore magna aliqua. Fill in the ______';
  }

}
