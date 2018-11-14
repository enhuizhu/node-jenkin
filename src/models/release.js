import model from '../core/model.js';
import { rejects } from 'assert';

module.exports = class Release extends model {
  constructor() {
    super();

    this.collection = this.db.collection('release');
  }

  createNewProject(projectConfig) {
    projectConfig.enabled = true;
    
    return new Promise((resolve, reject) => {
      this.collection.insertOne(projectConfig, (err, r) => {
        this.standardResponse(err, projectConfig, resolve, reject);
      });   
    });
  }

  getAllProjects() {
    return new Promise((resolve, reject) => {
      this.collection.find().toArray((err, docs) => {
        this.standardResponse(err, docs, resolve, reject, false);
      });
    });
  }
}