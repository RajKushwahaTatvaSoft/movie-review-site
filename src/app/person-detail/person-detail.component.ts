import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../core/services/person.service';
import { Person } from '../shared/models/person.model';
import { firstValueFrom } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { CastService } from '../core/services/cast.service';
import { CrewService } from '../core/services/crew.service';
import { MovieTileData } from '../shared/models/movie-tile-data.model';
import { MovieTileComponent } from '../shared/components/movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [MovieTileComponent, CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css',
})
export class PersonDetailComponent implements OnInit {
  personId: number = 0;
  personDetail: Person = new Person(0, '', 0, '');
  personCastList: PersonCast[] = [];

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private castService: CastService,
    private crewService: CrewService
  ) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['personId'];
    this.fetchPersonData();
  }

  fetchPersonData() {
    this.fetchPersonDetail();
    this.fetchPersonAsCastDetail();
    this.fetchPersonAsCrewDetail();
  }

  getGenderFromInteger(genderId: number) {
    if (genderId == 0) {
      return 'Not Specified';
    } else if (genderId == 1) {
      return 'Female';
    } else if (genderId == 2) {
      return 'Male';
    }
    return '';
  }

  async fetchPersonDetail() {
    const response = await firstValueFrom(
      this.personService.fetchPersonDetailById(this.personId)
    );

    this.personDetail = response.result;
  }

  async fetchPersonAsCastDetail() {
    const response = await firstValueFrom(
      this.castService.getMoviesStaredInById(this.personId)
    );

    debugger;
    console.log(response);
    this.personCastList = response.result;
    console.log(this.personCastList);
  }

  fetchPersonAsCrewDetail() {}
}

class PersonCast {
  character: string;
  movieId : number;
  title : string;
  posterUrl : string;
  castOrder: number;

  constructor(movieId:number,title:string,posterUrl:string,charName: string, castOrder: number, movieData: MovieTileData) {
    this.character = charName;
    this.castOrder = castOrder;
    this.movieId = movieId;
    this.title = title;
    this.posterUrl =posterUrl;
  }
}
