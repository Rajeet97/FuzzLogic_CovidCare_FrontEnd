import moment from "moment";

export const calculateAdditional = (arr, field) => {
  return arr.reduce((init, current) => init + current[field], 0);
};

export const handleMerge = (arr) => {
  const khali = {};
  arr.forEach((arr) => {
    if (khali[arr.createdOn]) {
      let total = khali[arr.createdOn].dailyconfirmed;
      let recovered = khali[arr.createdOn].dailyrecovered;
      let deaths = khali[arr.createdOn].dailydeceased;

      khali[arr.createdOn].dailyconfirmed = total + 1;
      khali[arr.createdOn].dailyrecovered =
        arr.recoveredOn !== null ? recovered + 1 : recovered;
      khali[arr.createdOn].dailydeceased =
        arr.deathOn !== null ? deaths + 1 : deaths;
      khali[arr.createdOn].dailyactive = total - recovered - deaths;
    } else {
      let total = 1;
      let recovered = arr.recoveredOn !== null ? 1 : 0;
      let deaths = arr.deathOn !== null ? 1 : 0;
      khali[arr.createdOn] = {
        dailyconfirmed: total,
        dailyrecovered: recovered,
        dailydeceased: deaths,
        dailyactive: total - recovered - deaths,
      };
    }
  });
  return khali;
};

export const caclulateTimeSeries = (groupedTimeline) => {
  Object.keys(groupedTimeline).forEach((e) => {
    const element = groupedTimeline[e];
    for (var m = moment("2020-01-01"); m.isBefore(moment()); m.add(1, "days")) {
      const hero = {
        dailyconfirmed: 0,
        dailyrecovered: 0,
        dailydeceased: 0,
        dailyactive: 0,
        date: m.toDate().setHours(0, 0, 0),
      };

      if (!element.find((estoElement) => moment(estoElement.date).isSame(m))) {
        element.push(hero);
      }
    }

    groupedTimeline[e] = element;
  });

  Object.keys(groupedTimeline).forEach((e) => {
    let total = 0;
    let recovered = 0;
    let deaths = 0;
    let active = 0;
    const sortedVai = groupedTimeline[e].sort((a, b) => {
      if (moment(a.date) < moment(b.date)) {
        return -1;
      } else if (moment(a.date) > moment(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
    sortedVai.forEach((l, i) => {
      total = total + l.dailyconfirmed;
      deaths = deaths + l.dailydeceased;
      recovered = recovered + l.dailyrecovered;
      active = active + l.dailyactive;
      groupedTimeline[e][i]["totalconfirmed"] = total;
      groupedTimeline[e][i]["totalactive"] = active;
      groupedTimeline[e][i]["totaldeceased"] = deaths;
      groupedTimeline[e][i]["totalrecovered"] = recovered;
    });
  });
  return groupedTimeline;
};

const getDateDiff = (date, mainDate) => {
  return moment(mainDate).diff(moment(date), "days") >= 1;
};

export const getTotalDiff = (
  date,
  totalCases,
  { total, deaths, recovered }
) => {
  const recoveredCases = totalCases.filter((dat) => dat.recoveredOn !== null);
  const deathCases = totalCases.filter((dat) => dat.deathOn !== null);

  const additionalTotal =
    total -
      totalCases.filter(({ reportedOn }) => getDateDiff(reportedOn, date))
        .length <
    0
      ? 0
      : total -
        totalCases.filter(({ reportedOn }) => getDateDiff(reportedOn, date))
          .length;
  const additionalRecovery =
    recovered -
      recoveredCases.filter(({ recoveredOn }) => getDateDiff(recoveredOn, date))
        .length <
    0
      ? recovered
      : recovered -
        recoveredCases.filter(({ recoveredOn }) =>
          getDateDiff(recoveredOn, date)
        ).length;
  const additionalDeaths =
    deaths -
      deathCases.filter(({ deathOn }) => getDateDiff(deathOn, date)).length <
    0
      ? deaths
      : deaths -
        deathCases.filter(({ deathOn }) => getDateDiff(deathOn, date)).length;
  return {
    additionalTotal,
    additionalRecovery,
    additionalDeaths,
    additionalActive: additionalTotal - additionalRecovery - additionalDeaths,
  };
};
