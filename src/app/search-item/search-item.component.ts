import { Component, Input, OnInit } from '@angular/core';

export interface searchResult {
  htmlTitle: string,
  displayLink: string,
  link: string,
  htmlSnippet: string
}

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input()
  item: searchResult = {
    htmlTitle: "",
    displayLink: "",
    link: "",
    htmlSnippet: ""
  };

  constructor() { }

  ngOnInit(): void {
  }

}
