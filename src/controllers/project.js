import controller from '../core/controller';
import ReleaseModel from '../models/release';


module.exports = class Project extends controller{
  constructor(req, res) {
    super(req, res);
    this.releaseModel = new ReleaseModel();
  }

  create() {
    let projectConfig;
    
    try {
      projectConfig = JSON.parse(this.req.rawBody);
    } catch(e) {
      this.sendErrorMsg('invalid json string');
      return ;
    }

    this.releaseModel.createNewProject(projectConfig)
      .then(this.sendSuccessMsg)
      .catch(this.sendErrorMsg);
  }

  getAllProjects() {
    this.releaseModel.getAllProjects()
      .then(this.sendSuccessMsg)
      .catch(this.sendErrorMsg);
  }
}