export class Job {
  jobId: number;
  jobTitle: string;
  departmentId: number;

  constructor(id: number, name: string, departmentId: number) {
    this.jobId = id;
    this.jobTitle = name;
    this.departmentId = departmentId;
  }
}
