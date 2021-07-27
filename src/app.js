const micromatch = require("micromatch");
const parsers = require("./parsers");

async function alertWebhook(req, res, settings, triggerControllers) {
  try {
    const body = req.body;
    const sevirity = parsers.severity(body.data.essentials.severity);
    const {alertRule} = body.data.essentials;
    triggerControllers.forEach((trigger) => {
      let {alertNamePat, alertSeverity, includeHigherSeverity} = trigger.params;
      alertSeverity = parsers.severity(alertSeverity);

      if (alertNamePat && !micromatch.isMatch(alertRule, alertNamePat)) return;
      if (alertSeverity !== "Any"){
        if (alertSeverity < sevirity) return;
        if (!includeHigherSeverity && alertSeverity != sevirity) return;
      }

      trigger.execute(alertRule, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message || JSON.stringify(err));
  }
}

module.exports = { 
  alertWebhook
};