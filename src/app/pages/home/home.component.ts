import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/BillboardResponde';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  public moviesSlideshow:Movie[] =[];
  public movies:Movie[] =[];
  @HostListener('window:scroll',['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop) + 1300 || document.body.scrollTop + 1300;
    const max =(document.documentElement.scrollHeight)|| document.body.scrollHeight;
    if(pos> max){
      if(this.movieService.loading){return;}
      this.movieService.getBillBoard().subscribe(movies=>{
        this.movies.push(...movies);
      })
    }
  }
  constructor(private movieService:MovieService) { }
  ngOnDestroy(): void {
   this.movieService.resetBillBoardPage();
  }

  ngOnInit(): void {
    this.getBillboards();
  }

  getBillboards(){
    this.movieService.getBillBoard().subscribe(movies=>{
      this.movies = movies;
      this.moviesSlideshow=movies;
    })
  }
}
