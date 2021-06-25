import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/shared/services/search/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  query: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService

  ) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get("query") as string;
    // this.searchService.getSuggestion

    this.searchService.getSuggestion('AIzaSyBS3FRcP1ty93DYePXhtR815E_MmkVP3aI', '017576662512468239146:omuauf_lfve', this.query)
    .subscribe( res => {
      console.log(res);
    });  

    this.searchService.getSearch('AIzaSyBS3FRcP1ty93DYePXhtR815E_MmkVP3aI', '017576662512468239146:omuauf_lfve', this.query)
    .subscribe( res => {
      console.log(res);
    });
  }

  onSearch(): void {
    this.router.navigate(['result'], { queryParams: { query: this.query }});
  }

}
