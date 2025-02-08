import { Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper'
import { GeneratedPhoto } from '../../../models/generated-photo.model';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit{

  @Input() graphicsList : GeneratedPhoto[] = []

  ngOnInit(): void {
    this.initCarousel()
  }
  
  initCarousel(){
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }


}
