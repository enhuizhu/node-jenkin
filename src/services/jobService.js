import Job from '../libs/job';

const jobs = [];

module.exports = class jobService {
  // need to get all the jobs at the beginning  
  static initJobs(projects) {
    projects.map(project => {
      if (project.enabled) {
        const job = new Job(project);
        jobs.push(job);
      }
    });
  }

  static getJobs() {
    return jobs;
  }
}