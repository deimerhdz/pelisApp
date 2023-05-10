import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/CreditResponse';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {
  @Input() cast:Cast[]=[];
  
  constructor() { }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper',{
      freeMode:true,
      spaceBetween:15,
      slidesPerView:5.3
    })
  }

  ngOnInit(): void { 
  }

}
