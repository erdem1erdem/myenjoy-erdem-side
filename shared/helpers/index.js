import moment from 'moment';
function extractEpisodeCode(line) {
  const regex = /S\d{2}E\d{2}/;
  const match = line.match(regex);
  return match ? match[0] : null;
}
function transformEpisodes(data) {
  const result = {};
  data.forEach(item => {
    const match = item['tvg-name'].match(/(.*) S(\d+)\s*E(\d+)/);
    if (match) {
      const showName = match[1].trim();
      const season = `S${match[2]}`;
      const episode = `E${match[3]}`;

      if (!result[season]) {
        result[season] = {season, episodes: []};
      }

      result[season].episodes.push({
        ...item,
        'tvg-name': `${showName} ${episode}`,
      });
    }
  });

  return Object.values(result);
}
function isAdult(line) {
  const adultWords = [
    'adults',
    'adult',
    'xxx',
    'porn',
    'sex',
    'for adults',
    'main category XXX',
    'channel xxx',
    'playbox',
    'amatour',
    'fake taxi',
    'fetish',
    'gay',
    'milf',
    'onlyfans',
    'only fans'
  ];
  const regex = new RegExp(adultWords.join('|'), 'i');
  return regex.test(line) ? true : false;
}

function extractYear(movieName) {
  const regex = /(?:\((\d{4})\)|\b(\d{4})\b)/;
  const match = movieName?.match(regex);
  if (match) return match[1] || match[2];
  else return null;
}

export const localToUtc = () => {
  return moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
};

export const helpers = {
  extractEpisodeCode,
  transformEpisodes,
  isAdult,
  extractYear,
  localToUtc,
};
