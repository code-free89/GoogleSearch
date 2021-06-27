import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { SearchService } from 'src/shared/services/search/search.service';
import { SuggestionComponent } from '../suggestion/suggestion.component';

export interface searchInformation {
  formattedSearchTime: number,
  formattedTotalResults: number,
  searchTime: number,
  totalResults: number,
}

export interface searchResult {
  htmlTitle: string,
  displayLink: string,
  link: string,
  htmlSnippet: string
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  query: string = '';
  suggestions: string[] = [];
  currentPage: number = 1;
  sort: string = 'review-rating:d:s';
  searchInfo: searchInformation = {
    formattedSearchTime : 0,
    formattedTotalResults: 0,
    searchTime: 0,
    totalResults: 0,
  };
  searchResults: searchResult[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent = new PageEvent();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.query = res.query;
    });

    this.suggestions = [];
    this.searchResults = [];

    this.getServerData({pageIndex: 0, pageSize: 10});
  }

  onSearch(): void {
    this.router.navigate(['result'], { queryParams: { query: this.query }});
  }

  getServerData(e: any){
    this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query, e.pageIndex * e.pageSize + 1, this.sort)
    .subscribe( res => {
      this.searchInfo = res.searchInformation;
      if(res.spelling) {
        this.suggestions = res.spelling.correctedQuery.split(' ');
      }
      this.suggestions = [];
      this.searchResults = [];
      if(res.items) {
        res.items.forEach((element: any) => {
          this.searchResults.push({
            htmlTitle: element.htmlTitle,
            displayLink: element.displayLink,
            link: element.link,
            htmlSnippet: element.htmlSnippet
          })
        });
      }
    });
  }

  clear() {
    this.query = "";
    this.searchResults = [];
    this.suggestions = [];
  }
}
