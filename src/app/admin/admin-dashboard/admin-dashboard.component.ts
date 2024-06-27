import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
import { MovieService } from '../../core/services/movie.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  public movieReleaseEachYearChart: any;
  movieReleasedEachYearList: any[] = [];
  chartMovieReleaseYearList: any[] = [];
  selectedEndYear = 2024;
  selectedStartYear = this.selectedEndYear - 20;

  public budgetAndRevenueChart: any;
  budgetAndRevenueEachYearList : any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMoviesReleasedEachYearData();
    this.fetchAvgBudgetAndRevenueByYear();
  }

  async fetchAvgBudgetAndRevenueByYear() {
    const response = await firstValueFrom(
      this.movieService.getAvgBudgetAndRevenueByYear()
    );
    this.budgetAndRevenueEachYearList = response.result;
    this.createAvgBudgetAndRevenueByYearChart();
  }
  

  async fetchMoviesReleasedEachYearData() {
    const response = await firstValueFrom(
      this.movieService.getMovieReleasedByYear()
    );
    this.movieReleasedEachYearList = response.result;
    this.createMovieReleaseByYearChart();
  }

  onMovieReleaseYearPrev() {
    let yearDiff = this.selectedEndYear - this.selectedStartYear;

    this.selectedEndYear = this.selectedStartYear - 1;
    this.selectedStartYear = this.selectedEndYear - yearDiff;
  }

  onMovieReleaseYearNext() {
    
    let yearDiff = this.selectedEndYear - this.selectedStartYear;

    this.selectedStartYear = this.selectedEndYear + 1;
    this.selectedEndYear = this.selectedEndYear + yearDiff + 1;
  }

  onMovieReleaseByYearApply() {
    // this.movieReleasedEachYearList = [];
    console.log(this.selectedStartYear);

    this.movieReleaseEachYearChart.data.datasets.forEach((dataset: any) => {
      dataset.fill = 'start';
    });

    this.chartMovieReleaseYearList = this.movieReleasedEachYearList.filter(
      (movie) =>
        movie.releaseYear >= this.selectedStartYear &&
        movie.releaseYear <= this.selectedEndYear
    );

    let yearList = this.chartMovieReleaseYearList.map(
      (item) => item.releaseYear
    );
    let dataList = this.chartMovieReleaseYearList.map(
      (item) => item.movieCount
    );

    this.movieReleaseEachYearChart.data = {
      // values on X-Axis
      labels: yearList,
      datasets: [
        {
          label: 'Movies Released Each Year',
          data: dataList,
          showLine: true,
          capBezierPoints: true,
          backgroundColor: 'blueviolet',
        },
      ],
    };

    this.movieReleaseEachYearChart.update();
  }

  
  onBudgetAndRevenueByYearApply() {
    // this.movieReleasedEachYearList = [];
    console.log(this.selectedStartYear);

    
    this.movieReleaseEachYearChart.data.datasets.forEach((dataset: any) => {
      dataset.fill = 'start';
    });

    this.chartMovieReleaseYearList = this.movieReleasedEachYearList.filter(
      (movie) =>
        movie.releaseYear >= this.selectedStartYear &&
        movie.releaseYear <= this.selectedEndYear
    );

    let yearList = this.chartMovieReleaseYearList.map(
      (item) => item.releaseYear
    );
    let dataList = this.chartMovieReleaseYearList.map(
      (item) => item.movieCount
    );

    this.movieReleaseEachYearChart.data = {
      // values on X-Axis
      labels: yearList,
      datasets: [
        {
          label: 'Movies Released Each Year',
          data: dataList,
          showLine: true,
          capBezierPoints: true,
          backgroundColor: 'blueviolet',
        },
      ],
    };

    this.movieReleaseEachYearChart.update();
  }

  createMovieReleaseByYearChart() {
    console.log(this.movieReleasedEachYearList);
    let yearList = this.movieReleasedEachYearList.map(
      (item) => item.releaseYear
    );
    let dataList = this.movieReleasedEachYearList.map(
      (item) => item.movieCount
    );

    this.movieReleaseEachYearChart = new Chart('MovieReleasedEachYearChart', {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: yearList,
        datasets: [
          {
            label: 'Movies Released Each Year',
            data: dataList,
            showLine: true,
            capBezierPoints: true,
            backgroundColor: 'blueviolet',
          },
        ],
      },
      options: {
        interaction: {
          mode: 'nearest',
        },
      },
    });
  }

  
  createAvgBudgetAndRevenueByYearChart() {
    console.log(this.budgetAndRevenueEachYearList);
    let yearList = this.budgetAndRevenueEachYearList.map(
      (item) => item.releaseYear
    );
    let budgetList = this.budgetAndRevenueEachYearList.map(
      (item) => item.avgBudget
    );
    let revenueList = this.budgetAndRevenueEachYearList.map(
      (item) => item.avgRevenue
    );

    this.budgetAndRevenueChart = new Chart('BudgetAndRevenueChart', {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: yearList,
        datasets: [
          {
            label: 'Average Budget Each Year',
            data: budgetList,
            showLine: true,
            capBezierPoints: true,
            backgroundColor: 'red',
          },
          {
            label: 'Average Revenue Each Year',
            data: revenueList,
            showLine: true,
            capBezierPoints: true,
            backgroundColor: 'green',
          },
        ],
      },
      options: {
        interaction: {
          mode: 'nearest',
        },
      },
    });
  }
}