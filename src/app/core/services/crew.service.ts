import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentConfig } from '../config/environment';
import { CrewItem } from '../../admin/movie-management/movie-management.component';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo`;
  private readonly crewUrl = `${this.databaseUrl}/Crew`;

  constructor(private http: HttpClient) {}

  fetchDepartmentList() {
    const url = `${this.crewUrl}/GetDepartment`;
    return this.http.get<any>(url);
  }

  fetchDepartmentByName() {}

  addCrewToMovieById(movieId: number, crewItems: CrewItem[]) {

    debugger;
    const url = `${this.crewUrl}/AddCrewDetailToMovie/${movieId}`;

    let crewList: {
      personIds: number[];
      jobId: number;
      departmentId: number;
    }[] = [];

    crewItems.forEach((data) => {
      let personList = data.selectedPersons.map((item) => item.personId);
      crewList.push({
        personIds: personList,
        jobId: data.selectedJob[0].jobId,
        departmentId: data.selectedDepartment[0].departmentId,
      });
    });

    debugger;
    return this.http.post<any>(url, crewList);
  }

  fetchJobListByDepartmentId(departmentId: number) {
    const params = new HttpParams().set('deptId', departmentId);

    const url = `${this.crewUrl}/GetJobsByDeptId`;
    return this.http.get<any>(url, {
      params,
    });
  }
}
