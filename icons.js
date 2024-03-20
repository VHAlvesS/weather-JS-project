export const icons = new Map();

iconMatching([0, 1], "sun");
iconMatching([2], "cloud-sun");
iconMatching([45, 48, 3], "smog");
iconMatching([3], "cloud");
iconMatching(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, , 81, 82],
  "cloud-heavy"
);
iconMatching([71, 73, 75, 77, 85, 86], "snow");
iconMatching([95, 96, 99], "cloud-bolt");

function iconMatching(values, icon) {
  values.forEach((element) => {
    icons.set(element, icon);
  });
}
