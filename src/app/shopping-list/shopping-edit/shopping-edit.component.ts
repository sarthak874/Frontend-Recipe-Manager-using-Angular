import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput',{static: false})nameInputRef : ElementRef
  // @ViewChild('amountInput',{static: false})amountInputRef : ElementRef
  // // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subscription: Subscription
  editMode: boolean=false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f',{static: false})shoppingEditForm: NgForm;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingEditForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onAddEditItem(form: NgForm){
    const value = form.value
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode= false;
    form.reset();
    // // this.ingredientAdded.emit(newIngredient);
  }

  onClear(){
    this.shoppingEditForm.reset();
    this.editMode= false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredeint(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
