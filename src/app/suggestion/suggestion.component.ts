import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input()
  suggestions: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
