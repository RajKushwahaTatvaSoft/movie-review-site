import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgMultiSelectDropDownModule,FormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent implements OnInit {
  userForm;
  dropdownList :{ item_id: number, item_text: string }[] = [];
  selectedItems  : { item_id: number, item_text: string }[]= [];
  dropdownSettings : IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      releasedate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      posterurl: ['', Validators.required],
      imdbid: ['', Validators.required],
      revenue: ['', Validators.min(1)],
      budget: ['', Validators.min(1)],
      overview: [''],
      plot: [''],
      writer: [''],
      actor: [''],
      director: [''],
    });
  }

  ngOnInit(): void {
  }


  extractBudgetNumbers(budgetString: string): string {
    // Use a regular expression to match digits, ".", "+" or "-".
    const regex = /[\d\-+\.]/g; // Add 'g' flag for global matching
    const match = budgetString.match(regex);

    // If a match is found, join the matched characters into a string.
    return match ? match.join('') : '';
  }

  fetchDetailsFromOmdb() {
    this.movieService
      .fetchDetailsFromOmdb(this.userForm.value.imdbid || '')
      .subscribe((data: any) => {
        console.log(data);
        console.log(data.Title);

        let duration: string = data.Runtime;

        this.userForm.setValue({
          title: data.Title,
          releasedate: this.getValidDate(data.Released),
          duration: duration.split(' ')[0],
          posterurl: data.Poster,
          imdbid: data.imdbID,
          revenue: this.extractBudgetNumbers(data.BoxOffice),
          budget: '',
          overview: data.Plot,
          plot: data.Plot,
          writer: data.Writer,
          actor: data.Actors,
          director: data.Director,
        });
      });
  }

  getValidDate(value: string) {
    // Split the date string into components (day, month, year)
    const dateParts = value.split(' ');
    if (dateParts.length !== 3) {
      console.warn(`Invalid date format: ${value}`);
      return value; // Return original value for invalid formats
    }

    const day = parseInt(dateParts[0], 10);
    const month = this.getMonthNumber(dateParts[1].toLowerCase());
    const year = parseInt(dateParts[2], 10);

    // Create a Date object with the extracted components
    const date = new Date(year, month, day);

    // Use toISOString() to get the date in YYYY-MM-DD format
    return date.toISOString().slice(0, 10);
  }

  private monthNumbers = new Map([
    ['jan', 0],
    ['feb', 1],
    ['mar', 2],
    ['apr', 3],
    ['may', 4],
    ['jun', 5],
    ['jul', 6],
    ['aug', 7],
    ['sep', 8],
    ['oct', 9],
    ['nov', 10],
    ['dec', 11],
  ]);

  private getMonthNumber(month: string): number {
    return this.monthNumbers.get(month.toLowerCase()) || -1;
  }

  submitForm(): void {
    debugger;
    if (this.userForm?.valid) {
      this.movieService.addMovieToDb(this.userForm.value);
    }
  }
}
