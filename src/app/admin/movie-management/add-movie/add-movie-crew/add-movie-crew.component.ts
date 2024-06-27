import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { Person } from '../../../../shared/models/person.model';
import { Job } from '../../../../shared/models/job.model';
import { Department } from '../../../../shared/models/department.model';
import { CrewService } from '../../../../core/services/crew.service';
import { PersonService } from '../../../../core/services/person.service';
import { CommonModule } from '@angular/common';
import { CrewItem } from '../../movie-management.component';

@Component({
  selector: 'app-add-movie-crew',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, FormsModule, CommonModule],
  templateUrl: './add-movie-crew.component.html',
  styleUrl: './add-movie-crew.component.css',
})
export class AddMovieCrewComponent implements OnInit {
  crewList: Person[] = [];
  releventJobList: Job[] = [];
  totalJobList: Job[] = [];
  departmentList: Department[] = [];

  isDropDownClick = false;

  crewDropDownSettings: IDropdownSettings = {};
  jobDropDownSettings: IDropdownSettings = {};
  departmentDropDownSettings: IDropdownSettings = {};

  @Input() crewItemsList: CrewItem[] = [
    new CrewItem(),
  ];

  constructor(
    private crewService: CrewService,
    private personService: PersonService
  ) {}

  trackByCrewItem(item : CrewItem){
    return item.selectedDepartment[0].departmentId;
  }
  ngOnInit(): void {
    this.crewDropDownSettings = {
      singleSelection: false,
      idField: 'personId',
      textField: 'personName',
      allowSearchFilter: true,
      enableCheckAll: false,
      clearSearchFilter: true,
      allowRemoteDataSearch: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: true,
      noFilteredDataAvailablePlaceholderText: 'No Person Available',
    };

    this.jobDropDownSettings = {
      singleSelection: true,
      idField: 'jobId',
      textField: 'jobTitle',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'Select Department First',
      noFilteredDataAvailablePlaceholderText: 'No Job Available',
    };

    this.departmentDropDownSettings = {
      singleSelection: true,
      idField: 'departmentId',
      textField: 'departmentName',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: "Couldn't fetch data",
      noFilteredDataAvailablePlaceholderText: 'No Department Available',
    };

    this.fetchDepartmentList();
  }

  addNewCrewItem() {
    this.crewItemsList.push(new CrewItem());
  }

  showSelectedCrew() {
    console.log(this.crewItemsList);
  }

  clearCrewList() {
    console.log('is clicked');
    this.crewList = [];
  }

  async fetchCrewList(item: any) {
    if (item.length == 0) {
      this.crewList = [];
    } else {
      this.personService
        .fetchPersonListForSuggestion(item)
        .subscribe((data) => {
          this.crewList = data.result;
        });
    }
  }

  clearJobList() {
    this.releventJobList = [];
  }

  removeCrewItem(castItem: CrewItem) {
    const index = this.crewItemsList.indexOf(castItem, 0);
    if (index > -1) {
      this.crewItemsList.splice(index, 1);
    }
  }

  sortCastItemsByDepartment() {
    this.crewItemsList.sort((n1, n2) => {
      if (
        n1.selectedDepartment.length == 0 ||
        n2.selectedDepartment.length == 0
      ) {
        return n2.selectedDepartment.length - n1.selectedDepartment.length;
      }

      return (
        n1.selectedDepartment[0].departmentId -
        n2.selectedDepartment[0].departmentId
      );
    });
  }

  onDepartmentDeSelect(index: number) {
    console.log(index);

    this.crewItemsList[index].selectedJob = [];

    this.sortCastItemsByDepartment();
  }

  async onDepartmentSelect(deptId: number,index : number) {
    
    this.crewItemsList[index].selectedJob = [];

    this.sortCastItemsByDepartment();
    await this.fetchJobList(deptId);
  }

  async fetchJobList(deptId: number) {
    this.clearJobList();

    this.totalJobList.forEach((value, index, obj) => {
      if (value.departmentId == deptId) {
        this.releventJobList.push(value);
      }
    });

    if (this.releventJobList.length == 0) {
      this.crewService.fetchJobListByDepartmentId(deptId).subscribe((data) => {
        console.log(data);
        this.releventJobList = data.result;
        this.totalJobList.push(...this.releventJobList);
      });
    }
  }

  getReleventJobs(deptId: number): Job[] {
    this.releventJobList = [];

    this.totalJobList.forEach((value, index, obj) => {
      if (value.departmentId == deptId) {
        this.releventJobList.push(value);
      }
    });

    return this.releventJobList;
  }

  async updateJobList(deptId: number): Promise<Job[]> {
    await this.fetchJobList(deptId);

    return this.releventJobList;
  }

  async fetchDepartmentList() {
    this.crewService.fetchDepartmentList().subscribe((data) => {
      this.departmentList = data.result;
    });
  }
}
