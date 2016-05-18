function Perf(nums){
  nums = nums || 10;

  var startTime;
  var endTime;
  var KEYNUMS = 'PerfNums';
  var KEYTIME = 'PerfTims';
  var KEYTOTAL = 'PerfTotal';

  function start(){
      startTime = new Date().getTime();
      setLocalNumsIfNotExist(KEYNUMS, nums);
      setLocalNumsIfNotExist(KEYTOTAL, nums);
  }

  function stop(){
      var num = getLocalNums() - 1;
      endTime = new Date().getTime();
      localStorage.setItem(KEYNUMS, num);
      setLocalTime(endTime - startTime);

      if(num >0 ){

          location.reload();
          return;
      }

      if( num === 0 ){
          showData();
      }
  }

  function showData(){
      var total = parseInt(localStorage.getItem(KEYTOTAL));
      var arrTime = localStorage.getItem(KEYTIME).split(',');
      var totalTime;

      console.log('总时间列表：');
      console.log(arrTime);
      totalTime = arrTime.reduce((prev, current)=>{
          return  parseInt(prev) + parseInt(current);
      });
      console.log('总计：' + totalTime);
      console.log('次数：' + total);
      console.log('平均性能：' + totalTime/ total);

      localStorage.removeItem(KEYNUMS);
      localStorage.removeItem(KEYTOTAL);
      localStorage.removeItem(KEYTIME);
  }

  function getLocalNums(){
      var num = localStorage.getItem(KEYNUMS);
      return parseInt(num);
  }

  function setLocalNumsIfNotExist(key, value){
      var num = localStorage.getItem(key);
      if(num === null){
          localStorage.setItem(key, value);
      }
  }

  function setLocalTime(timeStamp){
      var strTime = localStorage.getItem(KEYTIME);
      var arrTime = !strTime ? [] : strTime.split(',');
      arrTime.push(timeStamp);
      localStorage.setItem(KEYTIME, arrTime.join(','));
  }

  return{
      start: start,
      stop: stop
  }
}

module.exports = Perf;
