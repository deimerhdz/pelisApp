import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillBoardResponse, Movie } from '../interfaces/BillboardResponde';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MovieResponse } from '../interfaces/movieResponse';
import { Cast, CreditResponse } from '../interfaces/CreditResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url:string ='https://api.themoviedb.org/3';
  private billlBoardPage:number=1;
  public loading:boolean=false;

  constructor(private http:HttpClient) { }

  get params(){
    return {
      api_key:'556b46d667fb76e017f1f59a23541d4a',
      language:'es-ES',
      page:this.billlBoardPage.toString()
    }
  }
  resetBillBoardPage(){
    this.billlBoardPage = 1;
  }

  getBillBoard():Observable<Movie[]>{
    if(this.loading){
      return of([]);
    }
    this.loading=true;
    return this.http.get<BillBoardResponse>(`${this.url}/movie/now_playing`,{params:this.params})
    .pipe(
      map((resp)=> resp.results),
      tap(()=>{
        this.billlBoardPage+=1;
        this.loading=false;
      })
    );
  }

  searchMovie(text:string):Observable<Movie[]>{
    const params = {...this.params,page:1,query:text};
    return this.http.get<BillBoardResponse>(`${this.url}/search/movie`,{
      params
    }).pipe(
      map(resp=>resp.results)
    )
  }

  getMovieDetails(id:string){
    return this.http.get<MovieResponse>(`${this.url}/movie/${id}`,{
      params:this.params
    }).pipe(
      catchError(err=>of(null))
    )
  }
  getCast(id:string):Observable<Cast[]>{
    return this.http.get<CreditResponse>(`${this.url}/movie/${id}/credits`,{
      params:this.params
    }).pipe(
      map(resp=>resp.cast),
      catchError(err=>of([]))
    )
  }

}
