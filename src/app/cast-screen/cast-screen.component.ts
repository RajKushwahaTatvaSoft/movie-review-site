import { Component, OnInit } from '@angular/core';
import { Cast } from '../shared/models/cast.model';
import { CastService } from '../core/services/cast.service';
import { PaginationButtonComponent } from '../shared/components/pagination-button/pagination-button.component';
import { firstValueFrom } from 'rxjs';
import { PersonTileComponent } from '../person-tile/person-tile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShimmerListComponent } from '../shimmer-list/shimmer-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-screen',
  standalone: true,
  imports: [
    PaginationButtonComponent,
    PersonTileComponent,
    CommonModule,
    FormsModule,
    ShimmerListComponent,
  ],
  templateUrl: './cast-screen.component.html',
  styleUrl: './cast-screen.component.css',
})
export class CastScreenComponent implements OnInit {
  paginatedCastList: Cast[] = [];
  isLoading = true;
  currentPageNumber: number = 1;
  currentPageSize: number = 12;
  totalItems: number = 12;
  isSearchLoading = true;
  actorSearchInput: string = '';
  isShowActorSearchResults = false;
  actorSuggestionList: { personId: number; personName: string }[] = [];

  constructor(private castService: CastService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCastList();
  }

  fetchActorSuggestions(event: any) {
    this.isSearchLoading = true;
    this.isShowActorSearchResults = true;
    let search: string = event.target.value;

    this.actorSearchInput = search;

    if (search == null || search == '') {
      this.actorSuggestionList = [];
      this.isSearchLoading = false;
      this.isShowActorSearchResults = false;
      return;
    }

    this.castService.fetchCastSuggestions(search).subscribe((data: any) => {
      this.actorSuggestionList = data.result;
      console.log(this.actorSuggestionList);
      this.isSearchLoading = false;
    });
  }

  goDirectToPerson(personId: number) {
    this.router.navigate(['cast', personId]);
  }

  async fetchCastList() {
    const response = await firstValueFrom(
      this.castService.fetchPaginatedCastList(
        this.actorSearchInput,
        this.currentPageNumber,
        this.currentPageSize
      )
    );

    const paginatedResponse = response.result;

    this.paginatedCastList = paginatedResponse.data;
    this.totalItems = paginatedResponse.totalCount;
    this.isLoading = false;
  }

  searchActorName() {
    this.isLoading = true;
    this.currentPageNumber = 1;
    this.fetchCastList();
  }

  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchCastList();
  }
}
