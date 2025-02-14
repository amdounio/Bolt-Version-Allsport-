import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Background } from '../../../models/background.model';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { BackgroundService } from '../../../services/background.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Plans } from 'src/app/core/enums/plans.enum';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrl: './backgrounds.component.scss'
})
export class BackgroundsComponent implements OnInit{

  @Input() data: any;
  selcetedBackground : Background;
  filterDropDownLabel : string = "Choose your category of background";
  #activeModal: NgbActiveModal = inject(NgbActiveModal);
  backgoundCategorieList : Category[] = [];
  user 
  plans = Plans
  filterCategory : Category[] = []

  backgroundList : Background[] = [];

constructor(private categoryService : CategoriesService, private backgroundService : BackgroundService,private authService : AuthenticationService){}

ngOnInit(): void {
  this.getCategories()
  this.user = this.authService.getUser()
  this.getBackgrounds()
}

  close() {
    this.#activeModal.close({
      selectedBackground : this.selcetedBackground,

    })
  }

  getBackgrounds(){
    this.backgroundService.getAll().subscribe({
      next : res=>{
        this.backgroundList = res
        
      },
      error : error =>{
        console.log(error);
        
      }
    })
  }


  getCategories(){
    this.categoryService.getAll().subscribe({
      next : res=>{
        console.log(res);
        
        // this.backgoundCategorieList = res
        
      },
      error : error =>{
        console.log(error);
        
      }
    })
  }

  filterBackground(item:Category) {
    let labelText = ""
    let ids = []
    let findCategoryIndex = this.filterCategory.findIndex((match) => match.name === item.name)
    if (findCategoryIndex !== -1) {
      this.filterCategory.splice(findCategoryIndex, 1)
    } else {
      this.filterCategory.push(item)
    }
    if (this.filterCategory.length !==0) {
      this.filterCategory.forEach((category)=>{
        ids.push(category.id)
        if (labelText) {
          labelText = labelText + ", "+ category.name
        }else{
          labelText = category.name
        }
      })
    }else{
      ids = []
      labelText ="Choose your category of background"
    }
    this.getBackgroundByCategory(ids)
    this.filterDropDownLabel = labelText
  }


  getBackgroundByCategory(id:number[]){
    this.backgroundService.getBackgroundByCategories(id).subscribe({
      next:res=>{
        console.log(res);
        
      },
      error : error=>{
        console.log(error);
        
      }
    })
  }

  seclectBackground(item : Background) {
    this.selcetedBackground = item;

  }

  isBackgroundSelected(item: any): boolean {
    return this.selcetedBackground === item;
}

disableBackground(item : Background):boolean{
  return item.premium && this.user?.plan === this.plans.FREE;
}
}
