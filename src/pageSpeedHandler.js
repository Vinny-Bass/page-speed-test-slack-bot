const https = require('https');
const { URL, parse } = require('url');

class PageSpeedHandler {
  stringIsAValidUrl(s, protocols) {
    try {
      new URL(s);
      const parsed = parse(s);
      return protocols
        ? parsed.protocol
          ? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
          : false
        : true;
    } catch (err) {
      return false;
    }
  }

  setUpQuery(url) {
    const api = process.env.GOOGLE_API_BASE_URL
    const parameters = {
      url: encodeURIComponent(url)
    };
    let query = `${api}?`;
    for (let key in parameters) {
      query += `${key}=${parameters[key]}`;
    }
    return query;
  }

  getPageSpeedInsights(pageUrlToSearch) {
    if (!this.stringIsAValidUrl(pageUrlToSearch)) {
      throw new Error('Invalid Url')
    }

    const url = this.setUpQuery(pageUrlToSearch)

    return new Promise((resolve, reject) => {
      const request = https.get(url, response => {
        response.setEncoding('utf-8')
        let responseBody = ''

        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      })

      request.on('error', (err) => {
        reject(err);
      });

      request.end()
    })
  }

  async getFormatedPageSpeedInsights(pageUrlToSearch) {
    const insights = await this.getPageSpeedInsights(pageUrlToSearch)

    const { loadingExperience, lighthouseResult } = insights

    const platformUsedOnTest = lighthouseResult.configSettings.formFactor

    const pageQuality = loadingExperience.overall_category

    return `The quality of the page in ${platformUsedOnTest} is: "${pageQuality}"`
  }

}

module.exports = PageSpeedHandler