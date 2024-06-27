import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../../core/services/movie.service';
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from 'ng-multiselect-dropdown';
import { Genre } from '../../../shared/models/genre.model';
import { Person } from '../../../shared/models/person.model';
import { PersonService } from '../../../core/services/person.service';
import { Job } from '../../../shared/models/job.model';
import { Department } from '../../../shared/models/department.model';
import { CrewService } from '../../../core/services/crew.service';
import { AddMovieCastComponent } from './add-movie-cast/add-movie-cast.component';
import { AddMovieCrewComponent } from './add-movie-crew/add-movie-crew.component';
import Swal from 'sweetalert2';
import { catchError, firstValueFrom } from 'rxjs';
import { CastService } from '../../../core/services/cast.service';
import { CastItem, CrewItem } from '../movie-management.component';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    AddMovieCastComponent,
    AddMovieCrewComponent,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent implements OnInit {
  userForm;
  genreList: Genre[] = [];
  genreSelectedItems: Genre[] = [];
  detailEntryPage = 1;
  totalEntryPages = 3;
  isCrewDetailSeen = false;
  isCastDetailSeen = false;
  castItemList: CastItem[] = [];
  crewItemList: CrewItem[] = [];

  genreDropDownSettings: IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private personService: PersonService,
    private crewService: CrewService,
    private castService: CastService
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      releasedate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      posterurl: ['', Validators.required],
      imdbid: ['', Validators.required],
      revenue: ['0', Validators.min(1)],
      budget: ['0', Validators.min(1)],
      overview: [''],
      plot: [''],
      writer: [''],
      actor: [''],
      director: [''],
      selectedGenre: [this.genreSelectedItems, Validators.required],
    });
  }

  setCastDetailSeen() {
    this.isCastDetailSeen = true;
  }

  setCrewDetailSeen() {
    this.isCrewDetailSeen = true;
  }

  goToNextEntryPage() {
    this.detailEntryPage++;
  }

  goToPreviousEntryPage() {
    this.detailEntryPage--;
  }

  ngOnInit(): void {
    this.genreDropDownSettings = {
      singleSelection: false,
      idField: 'genreId',
      textField: 'genreName',
      allowSearchFilter: true,
      enableCheckAll: true,
      unSelectAllText: 'Remove All',
      selectAllText: 'Select All',
    };

    this.fetchGenre();
  }

  showCancelMovieModal() {}

  async fetchGenre() {
    this.genreList = await this.movieService.getGenreList();
  }

  printSelectedItem() {
    console.log(this.genreSelectedItems);
  }

  extractBudgetNumbers(budgetString: string): string {
    // Use a regular expression to match digits, ".", "+" or "-".
    const regex = /[\d\-+\.]/g; // Add 'g' flag for global matching
    const match = budgetString.match(regex);

    // If a match is found, join the matched characters into a string.
    return match ? match.join('') : '';
  }

  onImageError() {
    this.userForm.value.posterurl = '/assets/not_found_movie.svg';
  }

  showCrew() {
    console.log(this.crewItemList);
  }

  async uploadMovieDetails(): Promise<number> {
    Swal.fire({
      title: 'Uploading',
      html: 'Uploading Movie Details...',
    });
    Swal.showLoading();

    console.log(this.userForm.value);
    const response: any = await firstValueFrom(
      this.movieService.addMovieToDb(this.userForm.value)
    );

    debugger;
    if (
      response.isSuccess &&
      (response.statusCode == 200 || response.statusCode == 201)
    ) {
      return response.result;
    }

    return -1;
  }

  async uploadCastDetails(movieId: number): Promise<boolean> {
    debugger;
    Swal.fire({
      title: 'Uploading',
      html: 'Uploading Cast Details...',
    });
    Swal.showLoading();

    const response: any = await firstValueFrom(
      this.castService.addCastToMovieById(movieId, this.castItemList)
    );

    if (
      response.isSuccess &&
      (response.statusCode == 200 || response.statusCode == 201)
    ) {
      return true;
    }

    return false;
  }

  async uploadCrewDetails(movieId: number): Promise<boolean> {
    debugger;
    Swal.fire({
      title: 'Uploading',
      html: 'Uploading Crew Details...',
    });
    Swal.showLoading();

    const response: any = await firstValueFrom(
      this.crewService.addCrewToMovieById(movieId, this.crewItemList)
    );

    if (
      response.isSuccess &&
      (response.statusCode == 200 || response.statusCode == 201)
    ) {
      return true;
    }

    return false;
  }

  async saveMovieDetails() {
    debugger;
    const movieId = await this.uploadMovieDetails();

    if (movieId == -1) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Movie couldn\'t be added'
      });

      return;
    }

    const isCastSuccess = await this.uploadCastDetails(movieId);

    const isCrewSuccess = await this.uploadCrewDetails(movieId);

    if (isCastSuccess && isCrewSuccess) {
      Swal.fire('Added!', 'Movie added successfully.', 'success');
      return;
    }

    Swal.fire('Added', 'Movie added Successfully...But', 'warning');

    if (!isCastSuccess && !isCrewSuccess) {
      Swal.showValidationMessage('Cast and Crew could not be added');
    } else if (!isCrewSuccess) {
      Swal.showValidationMessage('Crew could not be added');
    } else if (!isCastSuccess) {
      Swal.showValidationMessage('Cast could not be added');
    }

    //     Swal.({
    //       title: 'Confirm your transaction',
    //       html: true,
    //       showCancelButton: true,
    //       confirmButtonColor: '#DD6B55',
    //       confirmButtonText: 'Send',
    //     });
    //     function () {
    //       $.ajax({
    //    type: "post",
    //     url: remoteUrl,
    //     data: largeParams,
    //    success: function (data) { }
    //   }).done(function (data) {
    //     swal("Thank you for your order", data, "success");
    //   }).error(function (data) {
    //   swal("Oops", "We couldn't connect to the server!", "error");
    //  });
  }

  submitForm(): void {
    debugger;
    if (this.userForm?.valid) {
      this.movieService.addMovieToDb(this.userForm.value);
    }
  }

  fetchDetailsFromOmdb() {
    this.movieService
      .fetchDetailsFromOmdb(this.userForm.value.imdbid || '')
      .subscribe((response: any) => {
        // console.log(data);
        // console.log(data.Title);

        let movieData = response.result;

        let duration: string = movieData.runtime;

        let genreString: string = movieData.genre;
        let omdbGenreList = genreString.split(',');
        let selectedGenre: Genre[] = [];
        omdbGenreList.forEach((data) => {
          let omdbGenreName = data.trim();
          let genre = this.genreList.find((value, index, obj) => {
            if (value.genreName == omdbGenreName) {
              return value;
            }
            return;
          });

          if (genre) {
            selectedGenre.push(genre);
          }
        });

        let writerDepartment = new Department(2, 'Writing');
        let writerJob = new Job(19, 'Writer', 2);

        let directorDepartment = new Department(3, 'Directing');
        let directorJob = new Job(4, 'Director', 3);

        let writerList: Person[] = [];
        let directorList: Person[] = [];

        let omdbWriters: string = movieData.writer;
        let omdbWriterList = omdbWriters.split(',');

        let omdbDirectors: string = movieData.director;
        let omdbDirectorList = omdbDirectors.split(',');

        let writerItem = new CrewItem();

        writerItem.selectedPersons = writerList;
        writerItem.selectedDepartment = [writerDepartment];
        writerItem.selectedJob = [writerJob];
        this.crewItemList.push(writerItem);

        let directorItem = new CrewItem();

        directorItem.selectedPersons = directorList;
        directorItem.selectedDepartment = [directorDepartment];
        directorItem.selectedJob = [directorJob];
        this.crewItemList.push(directorItem);

        debugger;
        omdbWriterList.forEach((data) => {
          debugger;
          this.personService
            .fetchPersonListForSuggestion(data)
            .subscribe((response) => {
              debugger;
              let responseList: Person[] = response.result;

              if (responseList.length > 0) {
                writerList.push(responseList[0]);
                let writerIndex = this.crewItemList.findIndex(
                  (data) => data.selectedDepartment[0].departmentId == 2
                );

                writerItem.selectedPersons = writerList;
                this.crewItemList[writerIndex] = writerItem;

                if (responseList.length > 1) {
                  console.log('More than one person found');
                }
              }
            });
        });

        omdbDirectorList.forEach((data) => {
          debugger;
          this.personService
            .fetchPersonListForSuggestion(data)
            .subscribe((response) => {
              debugger;
              let responseList: Person[] = response.result;

              if (responseList.length > 0) {
                directorList.push(responseList[0]);
                let directorIndex = this.crewItemList.findIndex(
                  (data) => data.selectedDepartment[0].departmentId == 3
                );

                directorItem.selectedPersons = directorList;
                this.crewItemList[directorIndex] = directorItem;

                if (responseList.length > 1) {
                  console.log('More than one person found');
                }
              }
            });
        });

        this.userForm.setValue({
          title: movieData.title,
          releasedate: this.getValidDate(movieData.released),
          duration: duration.split(' ')[0],
          posterurl: movieData.poster,
          imdbid: movieData.imdbID,
          revenue: this.extractBudgetNumbers(movieData.boxOffice),
          budget: '',
          overview: movieData.plot,
          plot: movieData.plot,
          writer: movieData.writer,
          actor: movieData.actors,
          director: movieData.director,
          selectedGenre: selectedGenre,
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
}
