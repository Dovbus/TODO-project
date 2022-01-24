export const storage = {
   saveHighTasks: (tasks) => {
      localStorage.setItem('highTasks', JSON.stringify(tasks))
   },
   getHighTasks: () => {
      const strTasks = localStorage.getItem('highTasks');
      const arrTasks = JSON.parse(strTasks);
      return arrTasks
   },
   saveLowTasks: (tasks) => {
      localStorage.setItem('lowTasks', JSON.stringify(tasks))
   },
   getLowTasks: () => {
      const strTasks = localStorage.getItem('lowTasks');
      const arrTasks = JSON.parse(strTasks);
      return arrTasks
   }
}