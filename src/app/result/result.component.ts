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
    // this.searchService.getSuggestion(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query)
    // .subscribe( res => {
    //   this.suggestions = res.spelling.correctedQuery.split(' ');
    // });  

    this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query, this.pageIndex * this.pageSize + 1)
    .subscribe( res => {
      console.log(res);
      this.searchInfo = res.searchInformation;
      if(res.spelling) {
        this.suggestions = res.spelling.correctedQuery.split(' ');
        this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.suggestions[0], this.pageIndex * this.pageSize + 1)
        .subscribe( res => {
          this.searchInfo = res.searchInformation;
        });
      } else {
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

  onSearch(): void {
    this.router.navigate(['result'], { queryParams: { query: this.query }});
  }

  public getServerData(e: any){
    console.log(e.pageIndex, e.pageSize);
    this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query, e.pageIndex * e.pageSize + 1)
    .subscribe( res => {
      this.searchInfo = res.searchInformation;
      if(res.spelling) {
        this.suggestions = res.spelling.correctedQuery.split(' ');
        this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.suggestions[0], e.pageIndex * e.pageSize + 1)
        .subscribe( res => {
          this.searchInfo = res.searchInformation;
        });
      } else {
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
}
