# kaholo-trigger-azure-monitoring
Kaholo integration with Azure Monitor Webhooks.

## How to use:
After installing the trigger on Kaholo, make sure to add to all wanted alert rules in azure monitor, an Action group, 
that has an action of type 'Webhook' to the Kaholo Webhook URL.
You can see more on alerts [here](https://docs.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview).

## Method: Alert
Triggers whenever there is an alert triggered from Azure Monitoring service.

### Webhook URL:
**{KAHOLO_URL}/webhook/azure/alert**

### Parameters:
1. Alert Rule Pattern (String) **Optional** - Alert rule or it's [minimatch pattern](https://github.com/isaacs/minimatch#readme). If not specified accept any.
2. Alert Severity (Options) **Optional** - Severity to accept in this trigger. If not specified there is no minimum. Possible values in their relative severity are: Any | Critical > Error > Warning > Informational > Verbose. Default Value is 'Any'
3. Include Higher Severity (boolean) **Optional** - If true, also accept any alerts with higher severities.