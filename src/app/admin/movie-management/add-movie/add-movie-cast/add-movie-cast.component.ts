import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { Person } from '../../../../shared/models/person.model';
import { PersonService } from '../../../../core/services/person.service';
import { CommonModule } from '@angular/common';
import { CastItem } from '../../movie-management.component';

@Component({
  selector: 'app-add-movie-cast',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, FormsModule, CommonModule],
  templateUrl: './add-movie-cast.component.html',
  styleUrl: './add-movie-cast.component.css',
})
export class AddMovieCastComponent implements OnInit {
  castList: Person[] = [];
  castDropDownSettings: IDropdownSettings = {};
  @Input() castItemsList: CastItem[] = [new CastItem()];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.castDropDownSettings = {
      singleSelection: true,
      idField: 'personId',
      textField: 'personName',
      searchPlaceholderText: 'Search Actor By Name',
      allowSearchFilter: true,
      allowRemoteDataSearch: true,
    };
  }

  addNewCastItem() {
    this.castItemsList.push(new CastItem());
  }

  showSelectedCast() {
    console.log(this.castItemsList);
  }

  clearCastList() {
    this.castList = [];
  }

  removeCastItem(castItem: CastItem) {
    const index = this.castItemsList.indexOf(castItem, 0);
    if (index > -1) {
      this.castItemsList.splice(index, 1);
    }
  }

  async fetchCastList(item: any) {
    if (item.length == 0) {
      this.castList = [];
    } else {
      this.personService
        .fetchPersonListForSuggestion(item)
        .subscribe((data) => {
          this.castList = data.result;
        });
    }
  }
}

