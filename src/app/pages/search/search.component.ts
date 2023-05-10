import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/BillboardResponde';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public text:string ='';
  public movies:Movie[]=[]
  constructor(private activatedRoute:ActivatedRoute,
    private movieService:MovieService) {
    this.activatedRoute.params.subscribe(params=>{
      console.log();
      this.text =params['text'];
      this.movieService.searchMovie(this.text).subscribe(movies=>{
        console.log(movies);
        this.movies = movies;
      })
    })
   }

  ngOnInit(): void {
  }

}
