import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/CreditResponse';
import { MovieResponse } from 'src/app/interfaces/movieResponse';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  
  public movie:MovieResponse;
  public cast:Cast[] = [];

  constructor(private activatedRoute:ActivatedRoute,
    private movieService:MovieService,
    private location:Location,
    private router:Router) { }

  ngOnInit(): void {
    const {id} =  this.activatedRoute.snapshot.params;
    combineLatest([
      this.movieService.getMovieDetails(id),
      this.movieService.getCast(id)
    ]).subscribe(([movie,cast])=>{
        if(!movie){
        this.router.navigateByUrl('/home')
        return;
      }
      this.movie =movie;
      this.cast = cast.filter(actor=>actor.profile_path !== null);
    })






  }

  onBack(){
    this.location.back();
  }

}
