import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { SearchService } from 'src/shared/services/search/search.service';

export interface searchInformation {
  formattedSearchTime: number,
  formattedTotalResults: number,
  searchTime: number,
  totalResults: number,
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
    // this.searchService.getSuggestion(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query)
    // .subscribe( res => {
    //   this.suggestions = res.spelling.correctedQuery.split(' ');
    // });  

    this.searchService.getSearch(environment.SEARCH_API, environment.SEARCH_ENGINE, this.query, this.currentPage)
    .subscribe( res => {
      console.log(res);
      this.searchInfo = res.searchInformation;
      if(res.spelling) {
        this.suggestions = res.spelling.correctedQuery.split(' ');
      }
    });
  }

  onSearch(): void {
    this.router.navigate(['result'], { queryParams: { query: this.query }});
  }

}
