
function getDependencyPattern(dependencyName){
  return `((${dependencyName}):(${dependencyVerPattern}))`;
}

const dependencyVerPattern =  `[0-9]*.[0-9]*.[0-9]*[-_~:\\w]*`;

module.exports = {
  getDependencyPattern,
  dependencyVerPattern
};