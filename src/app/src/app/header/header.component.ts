import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output() featureSelected = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFectchData(){
    this.dataStorageService.fetchRecipes();
  }

  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }

}
