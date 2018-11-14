describe('jobserviceSpec', () => {
  const jobService = require('../../src/services/jobService');
  
  const testData = [
    {
      "_id": "5bec383ed9c59a22d052768f",
      "name": "glencore-common-style",
      "svn": "https://svn.ldn.gb.glencore.net/svn/GUK/Products/GlencoreCommon/Angular/GlencoreCommonStyle/trunk",
      "script": "npm publish",
      "enabled": true
    },
    {
      "_id": "5bec3aa29a4ad518505334d6",
      "name": "glencore-common-style",
      "svn": "https://svn.ldn.gb.glencore.net/svn/GUK/Products/GlencoreCommon/Angular/GlencoreCommonStyle/trunk",
      "script": "npm publish"
    }
  ];

  it('initjobs', () => {
    jobService.initJobs(testData);
    expect(jobService.getJobs().length).toBe(1);
  });
});